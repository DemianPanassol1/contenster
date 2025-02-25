import { Request } from 'express';
import { I18nService } from 'nestjs-i18n';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CoreService } from 'src/core/core.service';

import { UsersRepository } from './users.repository';

import { PutUserReqDto } from './dto/req/putUser.req.dto';
import { GetUserReqDto } from './dto/req/getUser.req.dto';
import { PostUserReqDto } from './dto/req/postUser.req.dto';
import { DeleteUserReqDto } from './dto/req/deleteUser.req.dto';
import { GetUsersListReqDto } from './dto/req/getUsersList.req.dto';

import { GetUsersListResDto } from './dto/res/getUsersList.res.dto';
import { GetUserResDto } from './dto/res/getUser.res.dto';
import { User } from 'src/entities/contensterdb/user.entity';
import { Image } from 'src/entities/contensterdb/image.entity';
import { Preference } from 'src/entities/contensterdb/preference.entity';
import { PostUserResDto } from './dto/res/postUser.res.dto';
import { PutUserResDto } from './dto/res/putUser.res.dto';

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
      role: {
        id: user.userEstablishmentRole.find((role) => role.establishment.id === establishmentId)
          ?.role.id,
      },
    };

    return this.response(GetUserResDto, response);
  }

  async postUser(body: PostUserReqDto) {
    const { email, imageId, isActive, isBlocked, name, phone, preferenceId, username } = body;

    const saveUser: Partial<User> = {
      email,
      isActive,
      isBlocked,
      name,
      phone,
      username,
      image: { id: imageId } as Image,
      preference: { id: preferenceId } as Preference,
    };

    const checkUsername = await this.repo.getUserByUserName(username);

    if (checkUsername) {
      throw new HttpException(this.i18n.t('errors.usernameAlreadyExists'), HttpStatus.BAD_REQUEST);
    }

    const response = await this.repo.saveUser(saveUser);

    return this.response(PostUserResDto, response);
  }

  async putUser(body: PutUserReqDto) {
    const { id, email, imageId, isActive, isBlocked, name, phone, preferenceId, username } = body;

    const user = await this.repo.getUserById(id);

    if (!user) {
      throw new HttpException(this.i18n.t('errors.userNotFound'), HttpStatus.BAD_REQUEST);
    }

    const checkUsername = await this.repo.getUserByUserName(username);

    if (checkUsername && checkUsername.id !== id) {
      throw new HttpException(this.i18n.t('errors.usernameAlreadyExists'), HttpStatus.BAD_REQUEST);
    }

    const updateUser: Partial<User> = {
      id,
      email,
      isActive,
      isBlocked,
      name,
      phone,
      username,
      image: { id: imageId } as Image,
      preference: { id: preferenceId } as Preference,
    };

    const response = await this.repo.saveUser(updateUser);

    return this.response(PutUserResDto, response);
  }

  async deleteUser(query: DeleteUserReqDto) {
    throw new Error('Method not implemented.');
  }
}
