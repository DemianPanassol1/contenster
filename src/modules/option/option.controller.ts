import { Body, Controller, Post, Query } from '@nestjs/common';

import { OptionService } from './option.service';

import { Authenticate } from 'src/common/interceptors/authenticate.interceptor';
import { GetModuleOptionsReqDto } from './dto/req/getModuleOptions.req.dto';

@Controller({ version: '1' })
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Authenticate()
  @Post('get-module-options')
  async getModuleOptions(@Body() body: GetModuleOptionsReqDto) {
    return await this.optionService.getModuleOptions(body);
  }
}
