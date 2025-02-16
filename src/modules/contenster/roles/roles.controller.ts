import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';

import { RolesService } from './roles.service';

import { Authorize } from 'src/common/interceptors/authorize.interceptor';

import { GetRoleReqDto } from './dto/req/getRole.req.dto';
import { PutRoleReqDto } from './dto/req/putRole.req.dto';
import { PostRoleReqDto } from './dto/req/postRole.req.dto';
import { DeleteRoleReqDto } from './dto/req/deleteRole.req.dto';
import { GetRolesListReqDto } from './dto/req/getRolesList.req.dto';

@Authorize()
@Controller({ version: '1' })
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('get-roles-list')
  async getRolesList(@Body() body: GetRolesListReqDto) {
    return await this.rolesService.getRolesList(body);
  }

  @Get('get-role')
  async getRole(@Query() query: GetRoleReqDto) {
    return await this.rolesService.getRole(query);
  }

  @Post('post-role')
  async postRole(@Body() body: PostRoleReqDto) {
    return await this.rolesService.postRole(body);
  }

  @Put('put-role')
  async putRole(@Body() body: PutRoleReqDto) {
    return await this.rolesService.putRole(body);
  }

  @Delete('delete-role')
  async deleteRole(@Query() query: DeleteRoleReqDto) {
    return await this.rolesService.deleteRole(query);
  }
}
