import { I18nService } from 'nestjs-i18n';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CoreService } from 'src/core/core.service';
import { PermissionsRepository } from './permissions.repository';

import { PutPermissionReqDto } from './dto/req/putRole.req.dto';
import { GetPermissionReqDto } from './dto/req/getPermission.req.dto';
import { PostPermissionReqDto } from './dto/req/postPermission.req.dto';
import { DeletePermissionReqDto } from './dto/req/deletePermission.req.dto';
import { GetPermissionsListReqDto } from './dto/req/getPermissionsList.req.dto';

import { PutPermissionResDto } from './dto/res/putPermission.res.dto';
import { GetPermissionResDto } from './dto/res/getPermission.res.dto';
import { PostPermissionResDto } from './dto/res/postPermission.res.dto';
import { DeletePermissionResDto } from './dto/res/deletePermission.res.dto';
import { GetPermissionsListResDto } from './dto/res/getPermissionsList.res.dto';

import { Permission } from 'src/entities/contensterdb/permission.entity';

@Injectable()
export class PermissionsService extends CoreService {
  constructor(
    i18n: I18nService,
    private readonly repo: PermissionsRepository,
  ) {
    super(i18n);
  }

  async getPermissionsList(body: GetPermissionsListReqDto) {
    const [data, total] = await this.repo.getPermissionsPaginated(body);

    const response = {
      data: data.map((item) => ({
        ...item,
        role: this.translate(item.role.titles),
        establishment: item.role.establishment.corporateName,
        functionality: this.translate(item.functionality.titles),
      })),
      meta: {
        ...body,
        totalItems: total,
        totalPages: Math.ceil(total / body.pageSize),
        hasNextPage: total > body.pageNumber * body.pageSize,
      },
    };

    return this.response(GetPermissionsListResDto, response);
  }

  async getPermission(query: GetPermissionReqDto) {
    const { id } = query;

    const permission = await this.repo.getPermissionById(id);

    if (!permission) {
      throw new HttpException(this.i18n.t('errors.permissionNotFound'), HttpStatus.BAD_REQUEST);
    }

    const response = {
      ...permission,
      roleId: permission.role.id,
      functionalityId: permission.functionality.id,
      establishmentId: permission.role.establishment.id,
    };

    return this.response(GetPermissionResDto, response);
  }

  async postPermission(body: PostPermissionReqDto) {
    const { functionalityId, roleId } = body;
    const { canCreate, canDelete, canRead, canUpdate, permissionType } = body;

    const savePermission: Partial<Permission> = {
      canCreate,
      canDelete,
      canRead,
      canUpdate,
      permissionType,
      role: { id: roleId },
      functionality: { id: functionalityId },
    };

    const [_, count] = await this.repo.countPermissionByRoleAndFunctionality(
      roleId,
      functionalityId,
    );

    if (count > 0) {
      throw new HttpException(this.i18n.t('errors.permissionAlreadySet'), HttpStatus.BAD_REQUEST);
    }

    const response = await this.repo.savePermission(savePermission);

    return this.response(PostPermissionResDto, response);
  }

  async putPermission(body: PutPermissionReqDto) {
    const { id, functionalityId, roleId } = body;
    const { canCreate, canDelete, canRead, canUpdate, permissionType } = body;

    const permission = await this.repo.getPermissionById(id);

    if (!permission) {
      throw new HttpException(this.i18n.t('errors.permissionNotFound'), HttpStatus.BAD_REQUEST);
    }

    const [permissions] = await this.repo.countPermissionByRoleAndFunctionality(
      roleId,
      functionalityId,
    );

    if (permissions.filter((item) => item.id !== id).length > 0) {
      throw new HttpException(this.i18n.t('errors.permissionAlreadySet'), HttpStatus.BAD_REQUEST);
    }

    const updatePermission: Partial<Permission> = {
      id,
      canRead,
      canCreate,
      canDelete,
      canUpdate,
      permissionType,
      role: { id: roleId },
      functionality: { id: functionalityId },
    };

    const response = await this.repo.savePermission(updatePermission);

    return this.response(PutPermissionResDto, response);
  }

  async deletePermission(query: DeletePermissionReqDto) {
    const { id } = query;

    const permission = await this.repo.getPermissionById(id);

    if (!permission) {
      throw new HttpException(this.i18n.t('errors.permissionNotFound'), HttpStatus.BAD_REQUEST);
    }

    const response = await this.repo.removePermission(permission);

    return this.response(DeletePermissionResDto, response);
  }
}
