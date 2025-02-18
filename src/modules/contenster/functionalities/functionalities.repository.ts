import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CoreRepository } from 'src/core/core.repository';
import { PermissionType } from 'src/shared/enums/common.enums';
import { Permission } from 'src/entities/contensterdb/permission.entity';
import { Functionality } from 'src/entities/contensterdb/functionality.entity';

import { GetFunctionalitiesListReqDto } from './dto/req/getFunctionalitiesList.req.dto';

@Injectable()
export class FunctionalitiesRepository extends CoreRepository {
  constructor(
    public readonly i18n: I18nService,
    @InjectRepository(Permission) private permissionRepo: Repository<Permission>,
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
    const permissions = await this.permissionRepo.find({
      where: { functionality: { id: functionality.id } },
    });

    await this.permissionRepo.remove(permissions);

    return this.functionalityRepo.remove(functionality);
  }
}
