import { Request } from 'express';
import { Body, Controller, Post, Req } from '@nestjs/common';

import { Authorize } from 'src/common/interceptors/authorize.interceptor';

import { UsersService } from './users.service';
import { GetUsersListReqDto } from './dto/req/getUsersList.req.dto';

@Authorize()
@Controller({ version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('get-users-list')
  async getUsersList(@Req() req: Request, @Body() body: GetUsersListReqDto) {
    return await this.usersService.getUsersList(req, body);
  }
}
