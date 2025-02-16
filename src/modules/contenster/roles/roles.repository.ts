import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CoreRepository } from 'src/core/core.repository';
import { Role } from 'src/entities/contensterdb/role.entity';
import { PermissionType } from 'src/shared/enums/common.enums';

import { GetRolesListReqDto } from './dto/req/getRolesList.req.dto';

@Injectable()
export class RolesRepository extends CoreRepository {
  constructor(
    public readonly i18n: I18nService,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
  ) {
    super(i18n);
  }

  getRolesPaginated(query: GetRolesListReqDto): Promise<[Role[], number]> {
    const { permissionType, establishmentId } = query;

    return this.roleRepo.findAndCount({
      ...this.buildFilter(query, {
        establishment: {
          id: permissionType === PermissionType['establishment'] ? establishmentId : null,
        },
      }),
      relations: {
        establishment: true,
        titles: { language: true },
        descriptions: { language: true },
      },
    });
  }
}
