import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nService, I18nContext } from 'nestjs-i18n';

import { CoreRepository } from 'src/core/core.repository';

import { PermissionType } from 'src/shared/enums/common.enums';
import { Permission } from 'src/entities/contensterdb/permission.entity';
import { GetPermissionsListReqDto } from './dto/req/getPermissionsList.req.dto';

@Injectable()
export class PermissionsRepository extends CoreRepository {
  constructor(
    public readonly i18n: I18nService,
    @InjectRepository(Permission) private permissionRepo: Repository<Permission>,
  ) {
    super(i18n);
  }

  getPermissionsPaginated(query: GetPermissionsListReqDto): Promise<[Permission[], number]> {
    const { permissionType, establishmentId } = query;

    return this.permissionRepo.findAndCount({
      ...this.buildFilter(query, {
        role: {
          titles: { language: { languageCode: I18nContext.current().lang } },
          establishment: {
            id: permissionType === PermissionType['establishment'] ? establishmentId : null,
          },
        },
        functionality: {
          titles: { language: { languageCode: I18nContext.current().lang } },
        },
      }),
      relations: {
        role: {
          establishment: true,
          titles: { language: true },
        },
        functionality: {
          titles: { language: true },
        },
      },
    });
  }

  getPermissionById(id: number): Promise<Permission> {
    return this.permissionRepo.findOne({
      where: { id },
      relations: {
        functionality: true,
        role: {
          establishment: true,
        },
      },
    });
  }

  countPermissionByRoleAndFunctionality(
    roleId: number,
    functionalityId: number,
  ): Promise<[Permission[], number]> {
    return this.permissionRepo.findAndCount({
      where: { role: { id: roleId }, functionality: { id: functionalityId } },
      relations: {
        role: true,
        functionality: true,
      },
    });
  }

  savePermission(permission: Partial<Permission>): Promise<Permission> {
    return this.permissionRepo.save(permission);
  }

  removePermission(permission: Permission): Promise<Permission> {
    return this.permissionRepo.remove(permission);
  }
}
