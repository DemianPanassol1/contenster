import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nContext, I18nService } from 'nestjs-i18n';

import { Role } from 'src/entities/contensterdb/role.entity';
import { User } from 'src/entities/contensterdb/user.entity';
import { Module } from 'src/entities/contensterdb/module.entity';
import { Establishment } from 'src/entities/contensterdb/establishment.entity';

import { GetRoleOptionsReqDto } from './dto/req/getRoleOptions.req.dto';
import { GetModuleOptionsReqDto } from './dto/req/getModuleOptions.req.dto';

import { CoreRepository } from 'src/core/core.repository';
import { Functionality } from 'src/entities/contensterdb/functionality.entity';
import { GetPermissionByFunctionalityOptionsReqDto } from './dto/req/getPermissionByFunctionalityOptions.req.dto';

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
        titles: { language: { languageCode: I18nContext.current().lang } },
        descriptions: { language: { languageCode: I18nContext.current().lang } },
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
        titles: { language: { languageCode: I18nContext.current().lang } },
        descriptions: { language: { languageCode: I18nContext.current().lang } },
      }),
      relations: {
        establishment: true,
        titles: { language: true },
        descriptions: { language: true },
      },
    });
  }

  getFunctionalitiesPaginated(
    query: GetPermissionByFunctionalityOptionsReqDto,
  ): Promise<[Functionality[], number]> {
    return this.functionalityRepo.findAndCount({
      ...this.buildFilter(query, {
        id: query.functionalityId,
        permission: {
          role: {
            id: query.roleId,
            titles: { language: { languageCode: I18nContext.current().lang } },
            descriptions: { language: { languageCode: I18nContext.current().lang } },
          },
        },
        establishment: { id: query.establishmentId },
        titles: { language: { languageCode: I18nContext.current().lang } },
        module: {
          titles: { language: { languageCode: I18nContext.current().lang } },
          descriptions: { language: { languageCode: I18nContext.current().lang } },
        },
      }),
      relations: {
        icon: true,
        establishment: true,
        titles: { language: true },
        module: { titles: { language: true }, descriptions: { language: true } },
        permission: { role: { titles: { language: true }, descriptions: { language: true } } },
      },
    });
  }
}
