import { Request } from 'express';
import { I18nService } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';

import { CoreService } from 'src/core/core.service';
import { AdminRepository } from './admin.repository';
import { ICurrentUser } from 'src/shared/types/api.types';

import { ChangeUserEstablishmentReqDto } from './dto/req/changeUserEstablishment.req.dto';
import { ChangeUserEstablishmentResDto } from './dto/res/changeUserEstablishment.res.dto';

@Injectable()
export class AdminService extends CoreService {
  constructor(
    i18n: I18nService,
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

    return this.response(ChangeUserEstablishmentResDto, response);
  }

  async postChangeUserEstablishment(
    req: Request,
    body: ChangeUserEstablishmentReqDto,
    currentUser: ICurrentUser,
  ) {
    const { establishmentId } = body;

    currentUser.establishment.id = establishmentId;

    return await this.getSyncUser(req, currentUser);
  }
}
