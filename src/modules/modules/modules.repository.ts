import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CoreRepository } from 'src/core/core.repository';
import { PermissionType } from 'src/shared/enums/common.enums';
import { Module } from 'src/entities/contensterdb/module.entity';

import { GetModulesListReqDto } from './dto/req/getModulesList.req.dto';

@Injectable()
export class ModulesRepository extends CoreRepository {
  constructor(
    public readonly i18n: I18nService,
    @InjectRepository(Module) private moduleRepo: Repository<Module>,
  ) {
    super(i18n);
  }

  getModulesPaginated(query: GetModulesListReqDto): Promise<[Module[], number]> {
    const { permissionType, establishmentId } = query;

    return this.moduleRepo.findAndCount({
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
