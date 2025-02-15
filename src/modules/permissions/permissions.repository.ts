import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CoreRepository } from 'src/core/core.repository';

import { PermissionType } from 'src/shared/enums/common.enums';
import { Permission } from 'src/entities/contensterdb/permission.entity';
import { GetPermissionsListReqDto } from './dto/req/getPermissionsList.req.dto';

@Injectable()
export class PermissionsRepository extends CoreRepository {
  constructor(
    public readonly i18n: I18nService,
    @InjectRepository(Permission) private roleRepo: Repository<Permission>,
  ) {
    super(i18n);
  }

  getPermissionsPaginated(query: GetPermissionsListReqDto): Promise<[Permission[], number]> {
    const { permissionType, establishmentId } = query;

    return this.roleRepo.findAndCount({
      ...this.buildFilter(query, {
        role: {
          establishment: {
            id: permissionType === PermissionType['establishment'] ? establishmentId : null,
          },
        },
      }),
      relations: {
        role: {
          establishment: true,
          titles: { language: true },
          descriptions: { language: true },
        },
        functionality: {
          titles: { language: true },
        },
      },
    });
  }
}
