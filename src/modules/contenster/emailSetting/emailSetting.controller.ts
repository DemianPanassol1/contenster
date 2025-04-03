import { Controller, Get, Post, Body, Query, Put, Delete } from '@nestjs/common';

import { EmailSettingService } from './emailSetting.service';
import { Authenticate } from 'src/common/interceptors/authenticate.interceptor';

import { GetEmailSettingReqDto } from './dto/req/getEmailSetting.req.dto';
import { PutEmailSettingReqDto } from './dto/req/putEmailSetting.req.dto';
import { PostEmailSettingReqDto } from './dto/req/postEmailSetting.req.dto';
import { DeleteEmailSettingReqDto } from './dto/req/deleteEmailSetting.req.dto';
import { GetEmailSettingListReqDto } from './dto/req/getEmailSettingList.req.dto';

@Authenticate()
@Controller({ version: '1' })
export class EmailSettingController {
  constructor(private readonly emailSettingService: EmailSettingService) {}

  @Post('get-email-setting-list')
  async getEmailSettingList(@Body() body: GetEmailSettingListReqDto) {
    return await this.emailSettingService.getEmailSettingList(body);
  }

  @Get('get-email-setting')
  async getEmailSetting(@Query() query: GetEmailSettingReqDto) {
    return await this.emailSettingService.getEmailSetting(query);
  }

  @Post('post-email-setting')
  async postEmailSetting(@Body() body: PostEmailSettingReqDto) {
    return await this.emailSettingService.postEmailSetting(body);
  }

  @Put('put-email-setting')
  async putEmailSetting(@Body() body: PutEmailSettingReqDto) {
    return await this.emailSettingService.putEmailSetting(body);
  }

  @Delete('delete-email-setting')
  async deleteEmailSetting(@Query() query: DeleteEmailSettingReqDto) {
    return await this.emailSettingService.deleteEmailSetting(query);
  }
}
