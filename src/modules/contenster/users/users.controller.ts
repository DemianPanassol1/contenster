import { Request } from 'express';
import { Body, Controller, Delete, Get, Post, Put, Query, Req } from '@nestjs/common';

import { Authenticate } from 'src/common/interceptors/authenticate.interceptor';

import { UsersService } from './users.service';

import { GetUserReqDto } from './dto/req/getUser.req.dto';
import { PutUserReqDto } from './dto/req/putUser.req.dto';
import { PostUserReqDto } from './dto/req/postUser.req.dto';
import { DeleteUserReqDto } from './dto/req/deleteUser.req.dto';
import { GetUsersListReqDto } from './dto/req/getUsersList.req.dto';

@Authenticate()
@Controller({ version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('get-users-list')
  async getUsersList(@Req() req: Request, @Body() body: GetUsersListReqDto) {
    return await this.usersService.getUsersList(req, body);
  }

  @Get('get-user')
  async getUser(@Query() query: GetUserReqDto) {
    return await this.usersService.getUser(query);
  }

  @Post('post-user')
  async postUser(@Body() body: PostUserReqDto) {
    return await this.usersService.postUser(body);
  }

  @Put('put-user')
  async putUser(@Body() body: PutUserReqDto) {
    return await this.usersService.putUser(body);
  }

  @Delete('delete-user')
  async deleteUser(@Query() query: DeleteUserReqDto) {
    return await this.usersService.deleteUser(query);
  }
}
