import { I18nService } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';

import { CoreService } from 'src/core/core.service';
import { EstablishmentsRepository } from './establishments.repository';

import { GetEstablishmentsListReqDto } from './dto/req/getEstablishmentsList.req.dto';
import { GetEstablishmentsListResDto } from './dto/res/getEstablishmentsList.res.dto';

@Injectable()
export class EstablishmentsService extends CoreService {
  constructor(
    i18n: I18nService,
    private readonly repo: EstablishmentsRepository,
  ) {
    super(i18n);
  }

  async getEstablishmentsList(body: GetEstablishmentsListReqDto) {
    const [data, total] = await this.repo.getEstablishmentsPaginated(body);

    const response = {
      data: data,
      meta: {
        ...body,
        totalItems: total,
        totalPages: Math.ceil(total / body.pageSize),
        hasNextPage: total > body.pageNumber * body.pageSize,
      },
    };

    return this.response(GetEstablishmentsListResDto, response);
  }
}
