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

@Injectable()
export class OptionRepository extends CoreRepository {
  constructor(
    public readonly i18n: I18nService,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Role) private roleRepo: Repository<Role>,
    @InjectRepository(Module) private moduleRepo: Repository<Module>,
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
}
