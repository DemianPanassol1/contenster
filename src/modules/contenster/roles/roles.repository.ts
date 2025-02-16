import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CoreRepository } from 'src/core/core.repository';
import { Role } from 'src/entities/contensterdb/role.entity';
import { PermissionType } from 'src/shared/enums/common.enums';

import { GetRolesListReqDto } from './dto/req/getRolesList.req.dto';
import { Permission } from 'src/entities/contensterdb/permission.entity';
import { UserEstablishmentRole } from 'src/entities/contensterdb/userEstablishmentRole.entity';

@Injectable()
export class RolesRepository extends CoreRepository {
  constructor(
    public readonly i18n: I18nService,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    @InjectRepository(Permission) private permissionRepo: Repository<Permission>,
    @InjectRepository(UserEstablishmentRole)
    private userEstablishmentRoleRepo: Repository<UserEstablishmentRole>,
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
    return this.userEstablishmentRoleRepo.count({
      where: { establishment: { id: establishmentId }, role: { id: roleId } },
    });
  }

  async remeveRole(role: Role): Promise<Role> {
    const permissions = await this.permissionRepo.find({
      where: { role: { id: role.id } },
    });

    await this.permissionRepo.remove(permissions);

    return this.roleRepo.remove(role);
  }
}
