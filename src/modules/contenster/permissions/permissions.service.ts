import { I18nService } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';

import { CoreService } from 'src/core/core.service';
import { PermissionsRepository } from './permissions.repository';

import { GetPermissionsListReqDto } from './dto/req/getPermissionsList.req.dto';
import { GetPermissionsListResDto } from './dto/res/getPermissionsList.res.dto';

@Injectable()
export class PermissionsService extends CoreService {
  constructor(
    i18n: I18nService,
    private readonly repo: PermissionsRepository,
  ) {
    super(i18n);
  }

  async getPermissionsList(body: GetPermissionsListReqDto) {
    const [data, total] = await this.repo.getPermissionsPaginated(body);

    const response = {
      data: data.map((item) => ({
        ...item,
        role: this.translate(item.role.titles),
        establishment: item.role.establishment.corporateName,
        functionality: this.translate(item.functionality.titles),
      })),
      meta: {
        ...body,
        totalItems: total,
        totalPages: Math.ceil(total / body.pageSize),
        hasNextPage: total > body.pageNumber * body.pageSize,
      },
    };

    return this.response(GetPermissionsListResDto, response);
  }
}
