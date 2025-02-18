import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';

import { PermissionsService } from './permissions.service';

import { Authorize } from 'src/common/interceptors/authorize.interceptor';

import { PutPermissionReqDto } from './dto/req/putRole.req.dto';
import { GetPermissionReqDto } from './dto/req/getPermission.req.dto';
import { PostPermissionReqDto } from './dto/req/postPermission.req.dto';
import { DeletePermissionReqDto } from './dto/req/deletePermission.req.dto';
import { GetPermissionsListReqDto } from './dto/req/getPermissionsList.req.dto';

@Authorize()
@Controller({ version: '1' })
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post('get-permissions-list')
  async getPermissionsList(@Body() body: GetPermissionsListReqDto) {
    return await this.permissionsService.getPermissionsList(body);
  }

  @Get('get-permission')
  async getPermission(@Query() query: GetPermissionReqDto) {
    return await this.permissionsService.getPermission(query);
  }

  @Post('post-permission')
  async postPermission(@Body() body: PostPermissionReqDto) {
    return await this.permissionsService.postPermission(body);
  }

  @Put('put-permission')
  async putPermission(@Body() body: PutPermissionReqDto) {
    return await this.permissionsService.putPermission(body);
  }

  @Delete('delete-permission')
  async deletePermission(@Query() query: DeletePermissionReqDto) {
    return await this.permissionsService.deletePermission(query);
  }
}
