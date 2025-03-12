import { Body, Controller, Post } from '@nestjs/common';

import { OptionService } from './option.service';

import { Authorize } from 'src/common/interceptors/authorize.interceptor';

import { GetRoleOptionsReqDto } from './dto/req/getRoleOptions.req.dto';
import { GetModuleOptionsReqDto } from './dto/req/getModuleOptions.req.dto';
import { GetEstablishmentOptionsReqDto } from './dto/req/getEstablishmentOptions.req.dto';
import { GetFunctionalityOptionsReqDto } from './dto/req/getFunctionalityOptions.req.dto';

@Authorize()
@Controller({ version: '1' })
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @Post('get-module-options')
  async getModuleOptions(@Body() body: GetModuleOptionsReqDto) {
    return await this.optionService.getModuleOptions(body);
  }

  @Post('get-role-options')
  async getRoleOptions(@Body() body: GetRoleOptionsReqDto) {
    return await this.optionService.getRoleOptions(body);
  }

  @Post('get-functionality-options')
  async getFunctionalityOptions(@Body() body: GetFunctionalityOptionsReqDto) {
    return await this.optionService.getFunctionalityOptions(body);
  }

  @Post('get-establishment-options')
  async getEstablishmentOptions(@Body() body: GetEstablishmentOptionsReqDto) {
    return await this.optionService.getEstablishmentOptions(body);
  }
}
