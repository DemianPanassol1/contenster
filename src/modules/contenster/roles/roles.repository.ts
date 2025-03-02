import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CoreRepository } from 'src/core/core.repository';
import { Role } from 'src/entities/contensterdb/role.entity';
import { PermissionType } from 'src/shared/enums/common.enums';

import { GetRolesListReqDto } from './dto/req/getRolesList.req.dto';
import { Permission } from 'src/entities/contensterdb/permission.entity';
import { Translation } from 'src/entities/contensterdb/translation.entity';
import { UserEstablishmentRole as UER } from 'src/entities/contensterdb/userEstablishmentRole.entity';

@Injectable()
export class RolesRepository extends CoreRepository {
  constructor(
    public readonly i18n: I18nService,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    @InjectRepository(UER) private userEstabRoleRepo: Repository<UER>,
    @InjectRepository(Permission) private permissionRepo: Repository<Permission>,
    @InjectRepository(Translation) private translationRepo: Repository<Translation>,
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

  getRoleById(id: number): Promise<Role> {
    return this.roleRepo.findOne({
      where: { id },
      relations: {
        permission: true,
        establishment: true,
        titles: { language: true },
        descriptions: { language: true },
      },
    });
  }

  saveRole(role: Partial<Role>): Promise<Role> {
    return this.roleRepo.save(role);
  }

  countRolesByEstablishmentRole(establishmentId: number, roleId: number): Promise<number> {
    return this.userEstabRoleRepo.count({
      where: { establishment: { id: establishmentId }, role: { id: roleId } },
    });
  }

  async remeveRole(role: Role): Promise<Role> {
    await this.permissionRepo.remove(role.permission);

    await this.roleRepo.remove(role);

    await this.translationRepo.remove([...role.titles, ...role.descriptions]);

    return role;
  }
}
