import { Body, Controller, Post } from '@nestjs/common';

import { OptionService } from './option.service';

import { Authenticate } from 'src/common/interceptors/authenticate.interceptor';

import { GetRoleOptionsReqDto } from './dto/req/getRoleOptions.req.dto';
import { GetModuleOptionsReqDto } from './dto/req/getModuleOptions.req.dto';

@Controller({ version: '1' })
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Authenticate()
  @Post('get-module-options')
  async getModuleOptions(@Body() body: GetModuleOptionsReqDto) {
    return await this.optionService.getModuleOptions(body);
  }

  @Authenticate()
  @Post('get-role-options')
  async getRoleOptions(@Body() body: GetRoleOptionsReqDto) {
    return await this.optionService.getRoleOptions(body);
  }
}
