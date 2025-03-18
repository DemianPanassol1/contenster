import { I18nService } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';

import { CoreService } from 'src/core/core.service';
import { EmailSettingRepository } from './emailSetting.repository';

import { GetEmailSettingReqDto } from './dto/req/getEmailSetting.req.dto';
import { PutEmailSettingReqDto } from './dto/req/putEmailSetting.req.dto';
import { PostEmailSettingReqDto } from './dto/req/postEmailSetting.req.dto';
import { DeleteEmailSettingReqDto } from './dto/req/deleteEmailSetting.req.dto';
import { GetEmailSettingListReqDto } from './dto/req/getEmailSettingList.req.dto';

import { GetEmailSettingListResDto } from './dto/res/getEmailSettingList.res.dto';

@Injectable()
export class EmailSettingService extends CoreService {
  constructor(
    readonly i18n: I18nService,
    private readonly repo: EmailSettingRepository,
  ) {
    super(i18n);
  }

  async getEmailSettingList(body: GetEmailSettingListReqDto) {
    const [data, total] = await this.repo.getEmailSettingPaginated(body);

    const response = {
      data: data.map((item) => ({
        ...item,
        title: this.translate(item.titles),
        establishment: item.establishment.corporateName,
      })),
      meta: {
        ...body,
        totalItems: total,
        totalPages: Math.ceil(total / body.pageSize),
        hasNextPage: total > body.pageNumber * body.pageSize,
      },
    };

    return this.response(GetEmailSettingListResDto, response);
  }

  async getEmailSetting(query: GetEmailSettingReqDto) {
    throw new Error('Method not implemented.');
  }

  async deleteEmailSetting(query: DeleteEmailSettingReqDto) {
    throw new Error('Method not implemented.');
  }

  async putEmailSetting(body: PutEmailSettingReqDto) {
    throw new Error('Method not implemented.');
  }

  async postEmailSetting(body: PostEmailSettingReqDto) {
    throw new Error('Method not implemented.');
  }
}
