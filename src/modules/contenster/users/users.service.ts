import { Request } from 'express';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CoreService } from 'src/core/core.service';

import { UsersRepository } from './users.repository';

import { PutUserReqDto } from './dto/req/putUser.req.dto';
import { GetUserReqDto } from './dto/req/getUser.req.dto';
import { PostUserReqDto } from './dto/req/postUser.req.dto';
import { DeleteUserReqDto } from './dto/req/deleteUser.req.dto';
import { GetUsersListReqDto } from './dto/req/getUsersList.req.dto';

import { GetUserResDto } from './dto/res/getUser.res.dto';
import { PutUserResDto } from './dto/res/putUser.res.dto';
import { PostUserResDto } from './dto/res/postUser.res.dto';
import { GetUsersListResDto } from './dto/res/getUsersList.res.dto';

import { User } from 'src/entities/contensterdb/user.entity';
import { Role } from 'src/entities/contensterdb/role.entity';
import { Image } from 'src/entities/contensterdb/image.entity';
import { Preference } from 'src/entities/contensterdb/preference.entity';
import { Establishment } from 'src/entities/contensterdb/establishment.entity';
import { UserEstablishmentRole } from 'src/entities/contensterdb/userEstablishmentRole.entity';

@Injectable()
export class UsersService extends CoreService {
  constructor(
    i18n: I18nService,
    private readonly repo: UsersRepository,
  ) {
    super(i18n);
  }

  async getUsersList(req: Request, body: GetUsersListReqDto) {
    const [data, total] = await this.repo.getUsersPaginated(body);

    const response = {
      data: data.map((item) => ({
        ...item,
        image: this.generateFilePath(req, item.image?.filePath),
      })),
      meta: {
        ...body,
        totalItems: total,
        totalPages: Math.ceil(total / body.pageSize),
        hasNextPage: total > body.pageNumber * body.pageSize,
      },
    };

    return this.response(GetUsersListResDto, response);
  }

  async getUser(query: GetUserReqDto) {
    const { id, establishmentId } = query;

    const user = await this.repo.getUserById(id);
    console.log(user);
    
    if (!user) {
      throw new HttpException(this.i18n.t('errors.userNotFound'), HttpStatus.BAD_REQUEST);
    }

    const response = {
      ...user,
      roleId: user.userEstablishmentRole.find((role) => role.establishment.id === establishmentId)
        ?.role.id,
      establishmentId: user.userEstablishmentRole.find(
        (role) => role.establishment.id === establishmentId,
      ).establishment.id,
      imageId: user.image?.id,
      preferenceId: user.preference?.id,
      userEstablishmentRole: user.userEstablishmentRole.map((item) => ({
        ...item,
        role: {
          ...item.role,
          title: this.translate(item.role.titles),
          description: this.translate(item.role.descriptions),
        },
      })),
    };

    return this.response(GetUserResDto, response);
  }

  async postUser(body: PostUserReqDto) {
    const { establishmentId, roleId, imageId } = body;
    const { email, isActive, isBlocked, name, phone, username } = body;
    const { permissionType, password, repeatPassword, userEstablishmentRole } = body;

    if (password && password !== repeatPassword) {
      throw new HttpException(this.i18n.t('errors.passwordsNotMatch'), HttpStatus.BAD_REQUEST);
    }

    const language = await this.repo.getLanguageByCode(I18nContext.current().lang);

    const saveUser: Partial<User> = {
      email,
      isActive,
      isBlocked,
      name,
      phone,
      username,
      image: null,
      preference: {
        id: null,
        language,
        preferences: {},
        moduleOrder: [],
        functionalityOrder: [],
      } as Preference,
    };

    if (password) {
      saveUser.password = this.generatePassword(password);
    }

    if (imageId) {
      saveUser.image = { id: imageId } as Image;
    }

    const checkUsername = await this.repo.getUserByUserName(username);

    if (checkUsername) {
      throw new HttpException(this.i18n.t('errors.usernameAlreadyExists'), HttpStatus.BAD_REQUEST);
    }

    const response = await this.repo.saveUser(saveUser);

    const updateUser: Partial<User> = {
      id: response.id,
    };

    if (!userEstablishmentRole.length || permissionType === 'establishment') {
      updateUser.userEstablishmentRole = [
        {
          id: null,
          role: { id: roleId } as Role,
          user: { id: response.id } as User,
          establishment: { id: establishmentId } as Establishment,
        } as UserEstablishmentRole,
      ];
    } else if (permissionType === 'general' && userEstablishmentRole.length) {
      updateUser.userEstablishmentRole = userEstablishmentRole.map((item) => ({
        id: item.id,
        role: {
          id: item.establishmentId === establishmentId ? roleId : item.roleId,
        } as Role,
        user: { id: response.id } as User,
        establishment: { id: item.establishmentId } as Establishment,
      })) as UserEstablishmentRole[];
    }

    await this.repo.saveUser(updateUser);

    return this.response(PostUserResDto, response);
  }

  async putUser(body: PutUserReqDto) {
    const { establishmentId, preferenceId, roleId, imageId } = body;
    const { id, email, isActive, isBlocked, name, phone, username } = body;
    const { permissionType, password, repeatPassword, userEstablishmentRole } = body;

    const user = await this.repo.getUserById(body.id);

    if (!user) {
      throw new HttpException(this.i18n.t('errors.userNotFound'), HttpStatus.BAD_REQUEST);
    }

    const checkUsername = await this.repo.getUserByUserName(username);

    if (checkUsername && checkUsername.id !== id) {
      throw new HttpException(this.i18n.t('errors.usernameAlreadyExists'), HttpStatus.BAD_REQUEST);
    }

    if (password && password !== repeatPassword) {
      throw new HttpException(this.i18n.t('errors.passwordsNotMatch'), HttpStatus.BAD_REQUEST);
    }

    const updateUser: Partial<User> = {
      id,
      email,
      isActive,
      isBlocked,
      name,
      phone,
      username,
      image: null,
      preference: null,
      ...((permissionType === 'establishment' || !userEstablishmentRole.length) && {
        userEstablishmentRole: userEstablishmentRole.map((item) => ({
          id: item.id,
          user: { id: user.id } as User,
          establishment: { id: item.establishmentId } as Establishment,
        })) as UserEstablishmentRole[],
      }),
      ...(permissionType === 'general' && {
        userEstablishmentRole: userEstablishmentRole.map((item) => ({
          id: item.id,
          role: {
            id: item.establishmentId === establishmentId ? roleId : item.roleId,
          } as Role,
          user: { id: user.id } as User,
          establishment: { id: item.establishmentId } as Establishment,
        })) as UserEstablishmentRole[],
      }),
    };

    if (password) {
      updateUser.password = this.generatePassword(password);
    }

    if (imageId) {
      updateUser.image = { id: imageId } as Image;
    }

    if (preferenceId) {
      updateUser.preference = { id: preferenceId } as Preference;
    }

    const response = await this.repo.saveUser(updateUser);

    return this.response(PutUserResDto, response);
  }

  async deleteUser(query: DeleteUserReqDto) {
    throw new Error('Method not implemented.');
  }
}
