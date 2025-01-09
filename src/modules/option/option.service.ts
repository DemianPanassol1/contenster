import { I18nService } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';

import { CoreService } from 'src/core/core.service';
import { OptionRepository } from './option.repository';

import { GetModuleOptionsReqDto } from './dto/req/getModuleOptions.req.dto';
import { GetModuleOptionsResDto } from './dto/res/getModuleOptions.res.dto';

@Injectable()
export class OptionService extends CoreService {
  constructor(
    i18n: I18nService,
    private readonly repo: OptionRepository,
  ) {
    super(i18n);
  }

  async getModuleOptions(body: GetModuleOptionsReqDto) {
    const [data, total] = await this.repo.getModulesPaginated(body);

    const response = {
      data: this.toOptions(
        data.map((item) => ({ id: item.id, name: this.translate(item.titles) })),
        'id',
        'name',
        body.optional,
      ),
      meta: {
        ...body,
        totalItems: total,
        totalPages: Math.ceil(total / body.pageSize),
        hasNextPage: total > (body.pageNumber + 1) * body.pageSize,
      },
    };

    return this.response(GetModuleOptionsResDto, response);
  }
}
