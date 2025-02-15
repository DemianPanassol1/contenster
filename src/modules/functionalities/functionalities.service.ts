import { Request } from 'express';
import { I18nService } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';

import { CoreService } from 'src/core/core.service';
import { FunctionalitiesRepository } from './functionalities.repository';

import { GetFunctionalitiesListReqDto } from './dto/req/getFunctionalitiesList.req.dto';
import { GetFunctionalitiesListResDto } from './dto/res/getFunctionalitiesList.res.dto';

@Injectable()
export class FunctionalitiesService extends CoreService {
  constructor(
    i18n: I18nService,
    private readonly repo: FunctionalitiesRepository,
  ) {
    super(i18n);
  }

  async getFunctionalitiesList(req: Request, body: GetFunctionalitiesListReqDto) {
    const [data, total] = await this.repo.getFunctionalitiesPaginated(body);

    const response = {
      data: data.map((item) => ({
        ...item,
        title: this.translate(item.titles),
        icon: this.generateFilePath(req, item.icon),
      })),
      meta: {
        ...body,
        totalItems: total,
        totalPages: Math.ceil(total / body.pageSize),
        hasNextPage: total > body.pageNumber * body.pageSize,
      },
    };

    return this.response(GetFunctionalitiesListResDto, response);
  }
}
