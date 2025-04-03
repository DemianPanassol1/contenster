import { Request } from 'express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Post, Put, Query, Req } from '@nestjs/common';

import { AdminService } from './admin.service';
import { ICurrentUser } from 'src/shared/types/api.types';

import { File } from 'src/common/decorators/file.decorator';
import { UploadFile } from 'src/common/interceptors/upload.interceptor';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { Authenticate } from 'src/common/interceptors/authenticate.interceptor';

import { PutUserInfoReqDto } from './dto/req/putUserInfo.req.dto';
import { GetFileByIdReqDto } from './dto/req/getFileById.req.dto';
import { GetIconsListReqDto } from './dto/req/getIconsList.req.dto';
import { DeleteFileByIdReqDto } from './dto/req/deleteFileById.req.dto';
import { PutResetPasswordReqDto } from './dto/req/putResetPassword.req.dto';
import { PostChangeUserEstablishmentReqDto } from './dto/req/postChangeUserEstablishment.req.dto';

@Authenticate()
@Controller({ version: '1' })
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('get-sync-user')
  async getSyncUser(@Req() req: Request, @CurrentUser() currentUser: ICurrentUser) {
    return await this.adminService.getSyncUser(req, currentUser);
  }

  @Post('post-change-user-establishment')
  async postChangeUserCompany(
    @Req() req: Request,
    @Body() body: PostChangeUserEstablishmentReqDto,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return await this.adminService.postChangeUserEstablishment(req, body, currentUser);
  }

  @Put('put-reset-password')
  async putResetPassword(
    @Body() body: PutResetPasswordReqDto,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return await this.adminService.putResetPassword(body, currentUser);
  }

  @Get('get-user-info')
  async getUserInfo(@CurrentUser() currentUser: ICurrentUser) {
    return await this.adminService.getUserInfo(currentUser);
  }

  @Put('put-user-info')
  async putUserInfo(@Body() body: PutUserInfoReqDto) {
    return await this.adminService.putUserInfo(body);
  }

  @Get('get-modules-list')
  async getModulesList(@Req() req: Request, @CurrentUser() currentUser: ICurrentUser) {
    return await this.adminService.getModulesList(req, currentUser);
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
  @UploadFile()
  @Post('upload-file')
  async postUploadFile(@Req() req: Request, @File() file: Express.Multer.File) {
    return await this.adminService.postUploadFile(req, file);
  }

  @Post('get-icons-list')
  async getIconList(@Req() req: Request, @Body() body: GetIconsListReqDto) {
    return await this.adminService.getIconList(req, body);
  }

  @Get('get-file-by-id')
  async getFileById(@Req() req: Request, @Query() query: GetFileByIdReqDto) {
    return await this.adminService.getFileById(req, query);
  }

  @Delete('delete-file-by-id')
  async deleteFileById(@Query() query: DeleteFileByIdReqDto) {
    return await this.adminService.deleteFileById(query);
  }
}
