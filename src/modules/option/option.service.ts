import { I18nService } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';

import { CoreService } from 'src/core/core.service';
import { OptionRepository } from './option.repository';

import { GetRoleOptionsReqDto } from './dto/req/getRoleOptions.req.dto';
import { GetModuleOptionsReqDto } from './dto/req/getModuleOptions.req.dto';
import { GetPermissionByFunctionalityOptionsReqDto } from './dto/req/getPermissionByFunctionalityOptions.req.dto';

import { GetRoleOptionsResDto } from './dto/res/getRoleOptions.res.dto';
import { GetModuleOptionsResDto } from './dto/res/getModuleOptions.res.dto';
import { GetPermissionByFunctionalityOptionsResDto } from './dto/res/getPermissionByFunctionalityOptions.res.dto';

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

  async getRoleOptions(body: GetRoleOptionsReqDto) {
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

    return this.response(GetRoleOptionsResDto, response);
  }

  async getPermissionByFunctionalityOptions(body: GetPermissionByFunctionalityOptionsReqDto) {
    const [data, total] = await this.repo.getFunctionalitiesPaginated(body);

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

    return this.response(GetPermissionByFunctionalityOptionsResDto, response);
  }
}
