import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Role } from 'src/entities/contensterdb/role.entity';
import { User } from 'src/entities/contensterdb/user.entity';
import { Module } from 'src/entities/contensterdb/module.entity';
import { Establishment } from 'src/entities/contensterdb/establishment.entity';

import { CoreRepository } from 'src/core/core.repository';
import { Functionality } from 'src/entities/contensterdb/functionality.entity';

import { GetRoleOptionsReqDto } from './dto/req/getRoleOptions.req.dto';
import { GetModuleOptionsReqDto } from './dto/req/getModuleOptions.req.dto';
import { GetFunctionalityOptionsReqDto } from './dto/req/getFunctionalityOptions.req.dto';
import { GetEstablishmentOptionsReqDto } from './dto/req/getEstablishmentOptions.req.dto';

@Injectable()
export class OptionRepository extends CoreRepository {
  constructor(
    public readonly i18n: I18nService,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    @InjectRepository(Module) private moduleRepo: Repository<Module>,
    @InjectRepository(Functionality) private functionalityRepo: Repository<Functionality>,
    @InjectRepository(Establishment) private establishmentRepo: Repository<Establishment>,
  ) {
    super(i18n);
  }

  getModulesPaginated(query: GetModuleOptionsReqDto): Promise<[Module[], number]> {
    return this.moduleRepo.findAndCount({
      ...this.buildFilter(query, {
        establishment: { id: query.establishmentId },
      }),
      relations: {
        establishment: true,
        titles: { language: true },
        descriptions: { language: true },
      },
    });
  }

  getRolesPaginated(query: GetRoleOptionsReqDto): Promise<[Role[], number]> {
    return this.roleRepo.findAndCount({
      ...this.buildFilter(query, {
        establishment: { id: query.establishmentId },
      }),
      relations: {
        establishment: true,
        titles: { language: true },
        descriptions: { language: true },
      },
    });
  }

  getFunctionalitiesPaginated(
    query: GetFunctionalityOptionsReqDto,
  ): Promise<[Functionality[], number]> {
    const { establishmentId, roleId, functionalityId } = query;

    return this.functionalityRepo.findAndCount({
      ...this.buildFilter(query, {
        id: functionalityId,
        permission: { role: { id: roleId } },
        module: { establishment: { id: establishmentId } },
      }),
      relations: {
        titles: { language: true },
        module: { titles: { language: true }, descriptions: { language: true } },
        permission: { role: { titles: { language: true }, descriptions: { language: true } } },
      },
    });
  }

  getEstablishmentsPaginated(
    query: GetEstablishmentOptionsReqDto,
  ): Promise<[Establishment[], number]> {
    return this.establishmentRepo.findAndCount({
      ...this.buildFilter(query),
      relations: {},
    });
  }
}
