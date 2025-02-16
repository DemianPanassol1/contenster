import { Body, Controller, Post } from '@nestjs/common';

import { Authorize } from 'src/common/interceptors/authorize.interceptor';

import { ModulesService } from './modules.service';

import { GetModulesListReqDto } from './dto/req/getModulesList.req.dto';

@Authorize()
@Controller({ version: '1' })
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post('get-modules-list')
  async getModulesList(@Body() body: GetModulesListReqDto) {
    return await this.modulesService.getModulesList(body);
  }
}
