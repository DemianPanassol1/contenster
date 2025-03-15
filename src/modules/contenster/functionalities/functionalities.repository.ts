import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nContext, I18nService } from 'nestjs-i18n';

import { CoreRepository } from 'src/core/core.repository';
import { PermissionType } from 'src/shared/enums/common.enums';
import { Permission } from 'src/entities/contensterdb/permission.entity';
import { Translation } from 'src/entities/contensterdb/translation.entity';
import { Functionality } from 'src/entities/contensterdb/functionality.entity';

import { GetFunctionalitiesListReqDto } from './dto/req/getFunctionalitiesList.req.dto';

@Injectable()
export class FunctionalitiesRepository extends CoreRepository {
  constructor(
    public readonly i18n: I18nService,
    @InjectRepository(Permission) private permissionRepo: Repository<Permission>,
    @InjectRepository(Translation) private translationRepo: Repository<Translation>,
    @InjectRepository(Functionality) private functionalityRepo: Repository<Functionality>,
  ) {
    super(i18n);
  }

  getFunctionalitiesPaginated(
    query: GetFunctionalitiesListReqDto,
  ): Promise<[Functionality[], number]> {
    const { permissionType, establishmentId } = query;

    return this.functionalityRepo.findAndCount({
      ...this.buildFilter(query, {
        module: {
          establishment: {
            id: permissionType === PermissionType['establishment'] ? establishmentId : null,
          },
        },
        titles: { language: { languageCode: I18nContext.current().lang } },
      }),
      relations: {
        module: {
          establishment: true,
        },
        titles: { language: true },
      },
    });
  }

  getFunctionalityById(id: number): Promise<Functionality> {
    return this.functionalityRepo.findOne({
      where: { id },
      relations: {
        module: {
          establishment: true,
        },
        titles: { language: true },
        permission: true,
      },
    });
  }

  getBySlugAndEstablishment(
    slug: string,
    establishmentId: number,
  ): Promise<[Functionality[], number]> {
    return this.functionalityRepo.findAndCount({
      where: { slug, module: { establishment: { id: establishmentId } } },
      relations: {
        module: {
          establishment: true,
        },
      },
    });
  }

  saveFunctionality(functionality: Partial<Functionality>): Promise<Functionality> {
    return this.functionalityRepo.save(functionality);
  }

  async removeFunctionality(functionality: Functionality): Promise<Functionality> {
    await this.permissionRepo.remove(functionality.permission);

    await this.translationRepo.remove([...functionality.titles]);

    await this.functionalityRepo.remove(functionality);

    return functionality;
  }
}
