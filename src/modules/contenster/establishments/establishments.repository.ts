import { In, Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CoreRepository } from 'src/core/core.repository';
import { PermissionType } from 'src/shared/enums/common.enums';

import { Role } from 'src/entities/contensterdb/role.entity';
import { Module } from 'src/entities/contensterdb/module.entity';
import { Permission } from 'src/entities/contensterdb/permission.entity';
import { Translation } from 'src/entities/contensterdb/translation.entity';
import { Establishment } from 'src/entities/contensterdb/establishment.entity';
import { Functionality } from 'src/entities/contensterdb/functionality.entity';
import { UserEstablishmentRole } from 'src/entities/contensterdb/userEstablishmentRole.entity';

import { GetEstablishmentsListReqDto } from './dto/req/getEstablishmentsList.req.dto';

@Injectable()
export class EstablishmentsRepository extends CoreRepository {
  constructor(
    public readonly i18n: I18nService,
    @InjectRepository(Establishment) private establishmentRepo: Repository<Establishment>,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    @InjectRepository(Permission) private permissionRepo: Repository<Permission>,
    @InjectRepository(Module) private moduleRepo: Repository<Module>,
    @InjectRepository(Functionality) private functionalityRepo: Repository<Functionality>,
    @InjectRepository(UserEstablishmentRole)
    private userEstablishmentRoleRepo: Repository<UserEstablishmentRole>,
    @InjectRepository(Translation) private translationRepo: Repository<Translation>,
  ) {
    super(i18n);
  }

  getEstablishmentsPaginated(
    query: GetEstablishmentsListReqDto,
  ): Promise<[Establishment[], number]> {
    const { permissionType, establishmentId } = query;

    return this.establishmentRepo.findAndCount({
      ...this.buildFilter(query, {
        id: permissionType === PermissionType['establishment'] ? establishmentId : null,
      }),
      relations: {
        // image: true,
      },
    });
  }

  getEstablishmentById(id: number): Promise<Establishment> {
    return this.establishmentRepo.findOne({
      where: { id },
      relations: {
        image: true,
      },
    });
  }

  getEstablishmentCount(): Promise<number> {
    return this.establishmentRepo.count();
  }

  saveEstablishment(establishment: Partial<Establishment>): Promise<Establishment> {
    return this.establishmentRepo.save(establishment);
  }

  getEstablishmentByDocument(document: string): Promise<Establishment> {
    return this.establishmentRepo.findOne({
      where: { document },
    });
  }

  async removeEstablishment(establishment: Establishment): Promise<Establishment> {
    const modules = await this.moduleRepo.find({
      where: {
        establishment: { id: establishment.id },
      },
      relations: {
        titles: true,
        descriptions: true,
      },
    });

    const roles = await this.roleRepo.find({
      where: { establishment: { id: establishment.id } },
      relations: {
        titles: true,
        descriptions: true,
      },
    });

    const permissions = await this.permissionRepo.find({
      where: { role: { id: In(roles.map((role) => role.id)) } },
    });

    const functionalities = await this.functionalityRepo.find({
      where: {
        module: { id: In(modules.map((module) => module.id)) },
      },
      relations: {
        titles: true,
      },
    });

    const userEstablishmentRoles = await this.userEstablishmentRoleRepo.find({
      where: { establishment: { id: establishment.id } },
    });

    await this.userEstablishmentRoleRepo.remove(userEstablishmentRoles);
    await this.permissionRepo.remove(permissions);
    await this.roleRepo.remove(roles);
    await this.functionalityRepo.remove(functionalities);
    await this.moduleRepo.remove(modules);

    await this.translationRepo.remove([
      ...modules.map((m) => m.titles).flat(),
      ...modules.map((m) => m.descriptions).flat(),
      ...roles.map((m) => m.titles).flat(),
      ...roles.map((m) => m.descriptions).flat(),
      ...functionalities.map((m) => m.titles).flat(),
    ]);

    return this.establishmentRepo.remove(establishment);
  }
}
