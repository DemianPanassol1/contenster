import { I18nService } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';

import { CoreService } from 'src/core/core.service';
import { ModulesRepository } from './modules.repository';

import { GetModulesListReqDto } from './dto/req/getModulesList.req.dto';
import { GetModulesListResDto } from './dto/res/getModulesList.res.dto';

@Injectable()
export class ModulesService extends CoreService {
  constructor(
    i18n: I18nService,
    private readonly repo: ModulesRepository,
  ) {
    super(i18n);
  }

  async getModulesList(body: GetModulesListReqDto) {
    const [data, total] = await this.repo.getModulesPaginated(body);

    const response = {
      data: data.map((item) => ({
        ...item,
        title: this.translate(item.titles),
      })),
      meta: {
        ...body,
        totalItems: total,
        totalPages: Math.ceil(total / body.pageSize),
        hasNextPage: total > body.pageNumber * body.pageSize,
      },
    };

    return this.response(GetModulesListResDto, response);
  }
}
