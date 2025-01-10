import sharp from 'sharp';
import { Request } from 'express';
import { readdir } from 'fs/promises';
import { I18nService } from 'nestjs-i18n';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';

import { CoreService } from 'src/core/core.service';
import { AdminRepository } from './admin.repository';
import { ICurrentUser } from 'src/shared/types/api.types';

import { GetIconsListReqDto } from './dto/req/getModuleOptions.req.dto';
import { PutResetPasswordReqDto } from './dto/req/putResetPassword.req.dto';
import { PostChangeUserEstablishmentReqDto } from './dto/req/postChangeUserEstablishment.req.dto';

import { GetIconListResDto } from './dto/res/getIconList.res.dto';
import { PostUploadImageResDto } from './dto/res/postUploadImage.res.dto';
import { PutResetPasswordResDto } from './dto/res/putResetPassword.res.dto';
import { PostChangeUserEstablishmentResDto } from './dto/res/postChangeUserEstablishment.res.dto';

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

  async postUploadImage(req: Request, file: Express.Multer.File) {
    const image = await sharp(file.path).metadata();

    const response = await this.repo.saveImage({
      size: file.size,
      width: image.width,
      height: image.height,
      newName: file.filename,
      mimeType: file.mimetype,
      originalName: file.originalname,
      filePath: file.path.split('\\').slice(-3).join('/'),
    });

    Object.assign(response, {
      filePath: this.generateFilePath(req, response.filePath),
    });

    return this.response(PostUploadImageResDto, response);
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
}
