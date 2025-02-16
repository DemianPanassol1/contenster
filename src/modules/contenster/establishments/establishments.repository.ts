import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CoreRepository } from 'src/core/core.repository';
import { PermissionType } from 'src/shared/enums/common.enums';
import { Establishment } from 'src/entities/contensterdb/establishment.entity';

import { GetEstablishmentsListReqDto } from './dto/req/getEstablishmentsList.req.dto';

@Injectable()
export class EstablishmentsRepository extends CoreRepository {
  constructor(
    public readonly i18n: I18nService,
    @InjectRepository(Establishment) private roleRepo: Repository<Establishment>,
  ) {
    super(i18n);
  }

  getEstablishmentsPaginated(
    query: GetEstablishmentsListReqDto,
  ): Promise<[Establishment[], number]> {
    const { permissionType, establishmentId } = query;

    return this.roleRepo.findAndCount({
      ...this.buildFilter(query, {
        id: permissionType === PermissionType['establishment'] ? establishmentId : null,
      }),
      relations: {
        // image: true,
      },
    });
  }
}
