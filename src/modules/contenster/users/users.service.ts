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
import { DeleteUserResDto } from './dto/res/deleteUser.res.dto';
import { GetUsersListResDto } from './dto/res/getUsersList.res.dto';

import { User } from 'src/entities/contensterdb/user.entity';

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

    if (!user) {
      throw new HttpException(this.i18n.t('errors.userNotFound'), HttpStatus.BAD_REQUEST);
    }

    const response = {
      ...user,
      roleId: user.userEstablishmentRole.find((role) => role.establishment.id === establishmentId)
        ?.role.id,
      establishmentId,
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

    const checkUsername = await this.repo.getUserByUserName(username);

    if (checkUsername) {
      throw new HttpException(this.i18n.t('errors.usernameAlreadyExists'), HttpStatus.BAD_REQUEST);
    }

    const checkEmail = await this.repo.getUserByEmail(email);

    if (checkEmail) {
      throw new HttpException(this.i18n.t('errors.emailAlreadyExists'), HttpStatus.BAD_REQUEST);
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
      preference: { language },
      userEstablishmentRole: [],
    };

    if (!userEstablishmentRole.length || permissionType === 'establishment') {
      saveUser.userEstablishmentRole = [
        {
          id: null,
          role: { id: roleId },
          establishment: { id: establishmentId },
        },
      ];
    } else if (permissionType === 'general' && userEstablishmentRole.length) {
      saveUser.userEstablishmentRole = userEstablishmentRole.map((item) => ({
        id: item.id,
        role: {
          id: item.establishmentId === establishmentId ? roleId : item.roleId,
        },
        establishment: { id: item.establishmentId },
      }));
    }

    if (password) {
      saveUser.password = this.generatePassword(password);
    }

    if (imageId) {
      saveUser.image = { id: imageId };
    }

    const response = await this.repo.saveUser(saveUser);

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

    const checkEmail = await this.repo.getUserByEmail(email);

    if (checkEmail && checkEmail.id !== id) {
      throw new HttpException(this.i18n.t('errors.emailAlreadyExists'), HttpStatus.BAD_REQUEST);
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
    };

    if (password) {
      updateUser.password = this.generatePassword(password);
    }

    if (imageId) {
      updateUser.image = { id: imageId };
    }

    if (preferenceId) {
      updateUser.preference = { id: preferenceId };
    }

    if (!userEstablishmentRole.length || permissionType === 'establishment') {
      updateUser.userEstablishmentRole = [
        {
          id: null,
          role: { id: roleId },
          establishment: { id: establishmentId },
        },
      ];
    } else if (permissionType === 'general' && userEstablishmentRole.length) {
      updateUser.userEstablishmentRole = userEstablishmentRole.map((item) => ({
        id: item.id,
        role: {
          id: item.establishmentId === establishmentId ? roleId : item.roleId,
        },
        establishment: { id: item.establishmentId },
      }));
    }

    const response = await this.repo.saveUser(updateUser);

    return this.response(PutUserResDto, response);
  }

  async deleteUser(query: DeleteUserReqDto) {
    const { id } = query;

    const user = await this.repo.getUserById(id);

    if (!user) {
      throw new HttpException(this.i18n.t('errors.userNotFound'), HttpStatus.BAD_REQUEST);
    }

    const response = await this.repo.removeUser(user);

    return this.response(DeleteUserResDto, response);
  }
}
