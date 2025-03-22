import _ from 'lodash';
import sharp from 'sharp';
import { Request } from 'express';
import { readdir } from 'fs/promises';
import { I18nService } from 'nestjs-i18n';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';

import { CoreService } from 'src/core/core.service';
import { AdminRepository } from './admin.repository';
import { ICurrentUser } from 'src/shared/types/api.types';
import { defaultLanguage } from 'src/config/constants/constants.config';

import { PutUserInfoReqDto } from './dto/req/putUserInfo.req.dto';
import { GetFileByIdReqDto } from './dto/req/getFileById.req.dto';
import { GetIconsListReqDto } from './dto/req/getIconsList.req.dto';
import { DeleteFileByIdReqDto } from './dto/req/deleteFileById.req.dto';
import { PutResetPasswordReqDto } from './dto/req/putResetPassword.req.dto';
import { PostChangeUserEstablishmentReqDto } from './dto/req/postChangeUserEstablishment.req.dto';

import { GetUserInfoResDto } from './dto/res/getUserInfo.res.dto';
import { PutUserInfoResDto } from './dto/res/putUserInfo.res.dto';
import { GetFileByIdResDto } from './dto/res/getFileById.res.dto';
import { GetIconListResDto } from './dto/res/getIconList.res.dto';
import { GetConfigInfoResDto } from './dto/res/getConfigInfo.res.dto';
import { DeleteFileByIdResDto } from './dto/res/deleteFileById.res.dto';
import { PostUploadFileResDto } from './dto/res/postUploadFile.res.dto';
import { GetModulesListResDto } from './dto/res/getModulesList.res.dto';
import { PutResetPasswordResDto } from './dto/res/putResetPassword.res.dto';
import { PostChangeUserEstablishmentResDto } from './dto/res/postChangeUserEstablishment.res.dto';

import { User } from 'src/entities/contensterdb/user.entity';

@Injectable()
export class AdminService extends CoreService {
  constructor(
    i18n: I18nService,
    private readonly logger: Logger,
    private readonly repo: AdminRepository,
  ) {
    super(i18n);
  }

  async getSyncUser(req: Request, currentUser: ICurrentUser) {
    const user = await this.repo.findByUserId(currentUser.id);

    const roleId = user.userEstablishmentRole.find(
      (item) => item.establishment.id === currentUser.establishment.id,
    ).role.id;

    const permissions = await this.repo.findPermissions(roleId, currentUser.establishment.id);

    const response = {
      id: user.id,
      name: user.name,
      email: user.email,
      image: this.generateFilePath(req, user.image?.filePath),
      username: user.username,
      isActive: user.isActive,
      phone: user.phone,
      homePage: user.preference?.functionality?.slug ?? null,
      establishmentCount: user.userEstablishmentRole.length,
      role: {
        id: roleId,
        title: this.translate(permissions.role.titles),
        description: this.translate(permissions.role.descriptions),
      },
      permissions: permissions.role.permission.map((permission) => ({
        id: permission.id,
        title: this.translate(permission.functionality.titles),
        slug: permission.functionality.slug,
        canRead: permission.canRead,
        canCreate: permission.canCreate,
        canUpdate: permission.canUpdate,
        canDelete: permission.canDelete,
        type: permission.permissionType,
      })),
      establishment: {
        id: permissions.establishment.id,
        document: permissions.establishment.document,
        documentType: permissions.establishment.documentType,
        email: permissions.establishment.email,
        phone1: permissions.establishment.phone1,
        phone2: permissions.establishment.phone2,
        address: permissions.establishment.address,
        addressNumber: permissions.establishment.addressNumber,
        zipCode: permissions.establishment.zipCode,
        district: permissions.establishment.district,
        corporateName: permissions.establishment.corporateName,
        fantasyName: permissions.establishment.fantasyName,
        image:
          this.generateFilePath(req, permissions.establishment.image?.filePath) ??
          `${req.protocol}://${req.headers.host}/assets/images/system/react_icon.png`,
      },
    };

    req.session.user = response;

    return this.response(PostChangeUserEstablishmentResDto, response);
  }

  async postChangeUserEstablishment(
    req: Request,
    body: PostChangeUserEstablishmentReqDto,
    currentUser: ICurrentUser,
  ) {
    const { establishmentId } = body;

    currentUser.establishment.id = establishmentId;

    return await this.getSyncUser(req, currentUser);
  }

  async putResetPassword(body: PutResetPasswordReqDto, currentUser: ICurrentUser) {
    const { newPassword, oldPassword } = body;

    const user = await this.repo.findByUserId(currentUser.id);

    if (!user) {
      throw new HttpException(this.i18n.t('errors.userNotFound'), HttpStatus.BAD_REQUEST);
    }

    const passwordIsValid = this.validatePassword(oldPassword, user.password);

    if (!passwordIsValid) {
      throw new HttpException(this.i18n.t('errors.incorrectPassword'), HttpStatus.BAD_REQUEST);
    }

    await this.repo.updateUserPassword(user.id, this.generatePassword(newPassword));

    const response = { passwordReseted: true };

    return this.response(PutResetPasswordResDto, response);
  }

  async postUploadFile(req: Request, file: Express.Multer.File) {
    let image = null;

    if (!file.filename.endsWith('.ico') || file.mimetype !== 'image/vnd.microsoft.icon') {
      image = await sharp(file.path).metadata();
    }

    const response = await this.repo.saveImage({
      size: file.size,
      width: image?.width ?? null,
      height: image?.height ?? null,
      newName: file.filename,
      mimeType: file.mimetype,
      originalName: file.originalname,
      filePath: file.path.split('\\').slice(-3).join('/'),
    });

    Object.assign(response, {
      filePath: this.generateFilePath(req, response.filePath),
    });

    return this.response(PostUploadFileResDto, response);
  }

  async getIconList(req: Request, body: GetIconsListReqDto) {
    let systemIconsList = [];
    let iconsCount = 0;
    let filteredCount = 0;

    try {
      const dirEntries = await readdir(this.systemIconsPath, { withFileTypes: true });

      systemIconsList = dirEntries.map((systemIcon) => ({
        name: systemIcon.name,
        path: this.generateFilePath(req, 'assets/icons/system/' + systemIcon.name),
      }));

      const filter = body.filters.find(
        (elem) => elem.operation === 'LIKE' && elem.type === 'STRING' && elem.value,
      );

      if (filter) {
        systemIconsList = this.filterDataByField(
          systemIconsList,
          filter.field,
          filter.value as string,
        );
      }

      filteredCount = systemIconsList.length;

      iconsCount = dirEntries.length;

      systemIconsList = this.paginateData(systemIconsList, body.pageNumber, body.pageSize);
    } catch (error) {
      this.logger.error(error.message, error.stack);
    }

    const response = {
      data: systemIconsList,
      meta: {
        ...body,
        totalItems: iconsCount,
        totalFiltered: filteredCount,
        totalPages: Math.ceil(filteredCount / body.pageSize),
        hasNextPage: filteredCount > (body.pageNumber + 1) * body.pageSize,
      },
    };

    return this.response(GetIconListResDto, response);
  }

  async getModulesList(req: Request, currentUser: ICurrentUser) {
    const query = await this.repo.findFunctionalitiesByRole(currentUser.role.id);

    const data = {
      functionalities: query.permission.map((p) => ({
        id: p.functionality.id,
        slug: p.functionality.slug,
        title: this.translate(p.functionality.titles),
        icon: this.generateFilePath(req, p.functionality.icon),
        position: p.functionality.position,
        moduleId: p.functionality.module.id,
        permissions: {
          id: p.id,
          canRead: p.canRead,
          canCreate: p.canCreate,
          canUpdate: p.canUpdate,
          canDelete: p.canDelete,
          type: p.permissionType,
        },
      })),
      modules: query.permission.map((p) => ({
        id: p.functionality.module.id,
        position: p.functionality.module.position,
        title: this.translate(p.functionality.module.titles),
        // description: this.translate(p.functionality.module.descriptions),
      })),
    };

    const response = _.uniqBy(data.modules, 'id')
      .map((m) => ({
        ...m,
        functionalities: data.functionalities
          .filter((f) => f.moduleId === m.id)
          .sort((a, b) => a.position - b.position),
      }))
      .sort((a, b) => a.position - b.position);

    return this.response(GetModulesListResDto, response);
  }

  async getConfigInfo(req: Request) {
    const config = await this.repo.findConfiguration();

    const response = {
      id: config.id,
      projectName: config.projectName,
      favicon: this.generateFilePath(req, config.favicon.filePath),
      loginLogo: this.generateFilePath(req, config.loginLogo.filePath),
      loginBanner: this.generateFilePath(req, config.loginBanner.filePath),
      languages: config.languages.map((l) => ({
        id: l.id,
        name: l.name,
        purpose: l.purpose,
        code: l.languageCode,
        icon: this.generateFilePath(req, l.icon?.filePath),
        default: l.languageCode === defaultLanguage,
      })),
    };

    return this.response(GetConfigInfoResDto, response);
  }

  async getFileById(req: Request, query: GetFileByIdReqDto) {
    const image = await this.repo.getImageById(query.id);

    if (!image) {
      throw new HttpException(this.i18n.t('errors.imageNotFound'), HttpStatus.BAD_REQUEST);
    }

    const response = {
      ...image,
      filePath: this.generateFilePath(req, image.filePath),
    };

    return this.response(GetFileByIdResDto, response);
  }

  async getUserInfo(currentUser: ICurrentUser) {
    const user = await this.repo.findByUserId(currentUser.id);

    if (!user) {
      throw new HttpException(this.i18n.t('errors.userNotFound'), HttpStatus.BAD_REQUEST);
    }

    const response = {
      ...user,
      imageId: user.image?.id ?? '',
      preferenceId: user.preference?.functionality?.id ?? '',
    };

    return this.response(GetUserInfoResDto, response);
  }

  async putUserInfo(body: PutUserInfoReqDto) {
    const { id, email, imageId, name, phone, preferenceId, username } = body;

    const user = await this.repo.findByUserId(id);

    if (!user) {
      throw new HttpException(this.i18n.t('errors.userNotFound'), HttpStatus.BAD_REQUEST);
    }

    const updateUser: Partial<User> = {
      id,
      name,
      phone,
      email,
      username,
      image: imageId ? { id: imageId } : null,
      preference: preferenceId ? { id: preferenceId } : null,
    };

    const response = await this.repo.saveUser(updateUser);

    return this.response(PutUserInfoResDto, response);
  }

  async deleteFileById(query: DeleteFileByIdReqDto) {
    const { id } = query;

    const image = await this.repo.getImageById(id);

    if (!image) {
      throw new HttpException(this.i18n.t('errors.imageNotFound'), HttpStatus.BAD_REQUEST);
    }

    const response = await this.repo.removeImage(image);

    return this.response(DeleteFileByIdResDto, response);
  }
}
