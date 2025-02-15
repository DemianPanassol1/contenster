import { Body, Controller, Post } from '@nestjs/common';

import { PermissionsService } from './permissions.service';
import { Authorize } from 'src/common/interceptors/authorize.interceptor';

import { GetPermissionsListReqDto } from './dto/req/getPermissionsList.req.dto';

@Authorize()
@Controller({ version: '1' })
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post('get-permissions-list')
  async getPermissionsList(@Body() body: GetPermissionsListReqDto) {
    return await this.permissionsService.getPermissionsList(body);
  }
}
