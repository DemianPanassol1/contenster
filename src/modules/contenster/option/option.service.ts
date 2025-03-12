import { I18nService } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';

import { CoreService } from 'src/core/core.service';
import { OptionRepository } from './option.repository';

import { GetRoleOptionsReqDto } from './dto/req/getRoleOptions.req.dto';
import { GetModuleOptionsReqDto } from './dto/req/getModuleOptions.req.dto';
import { GetFunctionalityOptionsReqDto } from './dto/req/getFunctionalityOptions.req.dto';
import { GetEstablishmentOptionsReqDto } from './dto/req/getEstablishmentOptions.req.dto';

import { GetRoleOptionsResDto } from './dto/res/getRoleOptions.res.dto';
import { GetModuleOptionsResDto } from './dto/res/getModuleOptions.res.dto';
import { GetEstablishmentOptionsResDto } from './dto/res/getEstablishmentOptions.res.dto';
import { GetFunctionalityOptionsResDto } from './dto/res/getFunctionalityOptions.res.dto';

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

    if (body.establishmentIdRequired && body.establishmentId === null) {
      data.length = 0;
      body.optional = true;
    }

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
        hasNextPage: total > body.pageNumber * body.pageSize,
      },
    };

    return this.response(GetModuleOptionsResDto, response);
  }

  async getRoleOptions(body: GetRoleOptionsReqDto) {
    const [data, total] = await this.repo.getRolesPaginated(body);

    if (body.establishmentIdRequired && body.establishmentId === null) {
      data.length = 0;
      body.optional = true;
    }

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
        hasNextPage: total > body.pageNumber * body.pageSize,
      },
    };

    return this.response(GetRoleOptionsResDto, response);
  }

  async getFunctionalityOptions(body: GetFunctionalityOptionsReqDto) {
    const [data, total] = await this.repo.getFunctionalitiesPaginated(body);

    if (body.establishmentIdRequired && body.establishmentId === null) {
      data.length = 0;
      body.optional = true;
    }

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
        hasNextPage: total > body.pageNumber * body.pageSize,
      },
    };

    return this.response(GetFunctionalityOptionsResDto, response);
  }

  async getEstablishmentOptions(body: GetEstablishmentOptionsReqDto) {
    const [data, total] = await this.repo.getEstablishmentsPaginated(body);

    const response = {
      data: this.toOptions(data, 'id', 'corporateName', body.optional),
      meta: {
        ...body,
        totalItems: total,
        totalPages: Math.ceil(total / body.pageSize),
        hasNextPage: total > body.pageNumber * body.pageSize,
      },
    };

    return this.response(GetEstablishmentOptionsResDto, response);
  }
}
