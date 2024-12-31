import { Request } from 'express';
import { Body, Controller, Get, Post, Req } from '@nestjs/common';

import { AuthService } from './auth.service';
import { Authorize } from 'src/common/interceptors/authorize.interceptor';

import { SignInUserReqDto } from './dto/req/signIn.req.dto';
import { ResetPasswordReqDto } from './dto/req/resetPassword.req.dto';
import { CreatePasswordReqDto } from './dto/req/createPassword.req.dto';

@Authorize()
@Controller({ version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('authorize')
  postAuthorize(@Body() body: SignInUserReqDto) {
    return this.authService.postAuthorize(body);
  }

  @Post('sign-in')
  postSignIn(@Req() request: Request, @Body() body: SignInUserReqDto) {
    return this.authService.postSignIn(request, body);
  }

  @Get('sign-out')
  getSignOut(@Req() request: Request) {
    return this.authService.getSignOut(request);
  }

  @Post('reset-password')
  postResetPassword(@Req() request: Request, @Body() body: ResetPasswordReqDto) {
    return this.authService.postResetPassword(request, body);
  }

  @Post('create-password')
  postCreatePassword(@Body() body: CreatePasswordReqDto) {
    return this.authService.postCreatePassword(body);
  }
}
