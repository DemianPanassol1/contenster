import { Request } from 'express';
import { I18nService } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';

import { CoreService } from 'src/core/core.service';
import { UsersRepository } from './users.repository';

import { GetUsersListReqDto } from './dto/req/getUsersList.req.dto';
import { GetUsersListResDto } from './dto/res/getUsersList.res.dto';

@Injectable()
export class UsersService extends CoreService {
  constructor(
    i18n: I18nService,
    private readonly repo: UsersRepository,
  ) {
    super(i18n);
  }

  async getUsersList(req: Request, body: GetUsersListReqDto) {
    const [data, total] = await this.repo.getUsersPaginated(body);

    const response = {
      data: data.map((item) => ({
        ...item,
        image: this.generateFilePath(req, item.image?.filePath),
      })),
      meta: {
        ...body,
        totalItems: total,
        totalPages: Math.ceil(total / body.pageSize),
        hasNextPage: total > body.pageNumber * body.pageSize,
      },
    };

    return this.response(GetUsersListResDto, response);
  }
}
