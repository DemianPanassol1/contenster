import { Request } from 'express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Put, Req } from '@nestjs/common';

import { AdminService } from './admin.service';
import { ICurrentUser } from 'src/shared/types/api.types';

import { File } from 'src/common/decorators/file.decorator';
import { UploadFile } from 'src/common/interceptors/upload.interceptor';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { Authenticate } from 'src/common/interceptors/authenticate.interceptor';

import { PutResetPasswordReqDto } from './dto/req/putResetPassword.req.dto';
import { PostChangeUserEstablishmentReqDto } from './dto/req/postChangeUserEstablishment.req.dto';
import { GetIconsListReqDto } from './dto/req/getModuleOptions.req.dto';

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

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload de arquivo',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Authenticate()
  @UploadFile()
  @Post('upload-image')
  async postUploadImage(@Req() req: Request, @File() file: Express.Multer.File) {
    return await this.adminService.postUploadImage(req, file);
  }

  @Authenticate()
  @Post('get-icons-list')
  async getIconList(@Req() req: Request, @Body() body: GetIconsListReqDto) {
    return await this.adminService.getIconList(req, body);
  }
}
