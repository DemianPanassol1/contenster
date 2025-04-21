import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';

import { Authenticate } from 'src/common/guards/authenticate.guard';

import { ModulesService } from './modules.service';

import { GetModuleReqDto } from './dto/req/getModule.req.dto';
import { PutModuleReqDto } from './dto/req/putModule.req.dto';
import { PostModuleReqDto } from './dto/req/postModule.req.dto';
import { DeleteModuleReqDto } from './dto/req/deleteModule.req.dto';
import { GetModulesListReqDto } from './dto/req/getModulesList.req.dto';

@Authenticate()
@Controller({ version: '1' })
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post('get-modules-list')
  async getModulesList(@Body() body: GetModulesListReqDto) {
    return await this.modulesService.getModulesList(body);
  }

  @Get('get-module')
  async getModule(@Query() query: GetModuleReqDto) {
    return await this.modulesService.getModule(query);
  }

  @Post('post-module')
  async postModule(@Body() body: PostModuleReqDto) {
    return await this.modulesService.postModule(body);
  }

  @Put('put-module')
  async putModule(@Body() body: PutModuleReqDto) {
    return await this.modulesService.putModule(body);
  }

  @Delete('delete-module')
  async deleteModule(@Query() query: DeleteModuleReqDto) {
    return await this.modulesService.deleteModule(query);
  }
}
