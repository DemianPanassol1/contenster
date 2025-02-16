import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CoreRepository } from 'src/core/core.repository';
import { PermissionType } from 'src/shared/enums/common.enums';
import { Functionality } from 'src/entities/contensterdb/functionality.entity';

import { GetFunctionalitiesListReqDto } from './dto/req/getFunctionalitiesList.req.dto';

@Injectable()
export class FunctionalitiesRepository extends CoreRepository {
  constructor(
    public readonly i18n: I18nService,
    @InjectRepository(Functionality) private roleRepo: Repository<Functionality>,
  ) {
    super(i18n);
  }

  getFunctionalitiesPaginated(
    query: GetFunctionalitiesListReqDto,
  ): Promise<[Functionality[], number]> {
    const { permissionType, establishmentId } = query;

    return this.roleRepo.findAndCount({
      ...this.buildFilter(query, {
        module: {
          establishment: {
            id: permissionType === PermissionType['establishment'] ? establishmentId : null,
          },
        },
      }),
      relations: {
        module: {
          establishment: true,
        },
        titles: { language: true },
      },
    });
  }
}
