import jwt from 'jsonwebtoken';
import { I18nService } from 'nestjs-i18n';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import variables from 'src/settings';
import { CoreService } from 'src/core/core.service';

import { GenerateTokenReqDto } from './dto/req/generateToken.req.dto';
import { GenerateTokenResDto } from './dto/res/generateToken.res.dto';
import { ValidateTokenResDto } from './dto/res/validateToken.res.dto';

@Injectable()
export class ApiService extends CoreService {
  constructor(readonly i18n: I18nService) {
    super(i18n);
  }

  getValidateToken() {
    const response = { validated: true };

    return this.response(ValidateTokenResDto, response);
  }

  getGenerateToken(body: GenerateTokenReqDto) {
    const { login, password } = body;

    if (login !== variables.API_LOGIN || password !== variables.API_PASSWORD) {
      throw new HttpException(this.i18n.t('errors.invalidApiCredentials'), HttpStatus.UNAUTHORIZED);
    }

    const payload = {
      jwt: true,
      date: new Date().toISOString(),
      payload: 'Lorem ipsum dolor sit amet',
    };

    const response = {
      token: jwt.sign(payload, variables.JWT_TOKEN, { expiresIn: '15min' }),
    };

    return this.response(GenerateTokenResDto, response);
  }
}
