import { Request } from 'express';
import { Body, Controller, Get, Post, Put, Req } from '@nestjs/common';

import { AdminService } from './admin.service';
import { ICurrentUser } from 'src/shared/types/api.types';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { Authenticate } from 'src/common/interceptors/authenticate.interceptor';

import { PutResetPasswordReqDto } from './dto/req/putResetPassword.req.dto';
import { PostChangeUserEstablishmentReqDto } from './dto/req/postChangeUserEstablishment.req.dto';

@Controller({ version: '1' })
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Authenticate()
  @Get('get-sync-user')
  async getSyncUser(@Req() req: Request, @CurrentUser() currentUser: ICurrentUser) {
    return await this.adminService.getSyncUser(req, currentUser);
  }

  @Authenticate()
  @Post('post-change-user-establishment')
  async postChangeUserCompany(
    @Req() req: Request,
    @Body() body: PostChangeUserEstablishmentReqDto,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return await this.adminService.postChangeUserEstablishment(req, body, currentUser);
  }

  @Authenticate()
  @Put('put-reset-password')
  async putResetPassword(
    @Body() body: PutResetPasswordReqDto,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return await this.adminService.putResetPassword(body, currentUser);
  }
}
