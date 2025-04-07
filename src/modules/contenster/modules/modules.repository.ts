import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nContext, I18nService } from 'nestjs-i18n';

import { CoreRepository } from 'src/core/core.repository';

import { GetModulesListReqDto } from './dto/req/getModulesList.req.dto';

import { Module } from 'src/entities/contensterdb/module.entity';
import { Translation } from 'src/entities/contensterdb/translation.entity';
import { PermissionType } from 'src/entities/contensterdb/permission.entity';

@Injectable()
export class ModulesRepository extends CoreRepository {
  constructor(
    public readonly i18n: I18nService,
    @InjectRepository(Module, 'contensterdb') private moduleRepo: Repository<Module>,
    @InjectRepository(Translation, 'contensterdb') private translationRepo: Repository<Translation>,
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
        titles: { language: { languageCode: I18nContext.current().lang } },
      }),
      relations: {
        establishment: true,
        titles: { language: true },
      },
    });
  }

  getModuleById(id: number): Promise<Module> {
    return this.moduleRepo.findOne({
      where: { id },
      relations: {
        establishment: true,
        functionality: true,
        titles: { language: true },
        descriptions: { language: true },
      },
    });
  }

  saveModule(module: Partial<Module>): Promise<Module> {
    return this.moduleRepo.save(module);
  }

  async removeModule(module: Module): Promise<Module> {
    await this.moduleRepo.remove(module);

    await this.translationRepo.remove([...module.titles, ...module.descriptions]);

    return module;
  }
}
