import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import variables from 'src/settings';
import { CoreService } from 'src/core/core.service';

import { GenerateTokenReqDto } from './dto/req/generateToken.req.dto';
import { GenerateTokenResDto } from './dto/res/generateToken.res.dto';
import { ValidateTokenResDto } from './dto/res/validateToken.res.dto';

@Injectable()
export class ApiService extends CoreService {
  getValidateToken() {
    const response = { validated: true };

    return this.response(ValidateTokenResDto, response);
  }

  getGenerateToken(body: GenerateTokenReqDto) {
    const { login, password } = body;

    if (login !== variables.API_LOGIN || password !== variables.API_PASSWORD) {
      throw new HttpException('Unauthorized Message', HttpStatus.UNAUTHORIZED);
    }

    const payload = {
      jwt: true,
      expiresIn: '1h',
      date: new Date(),
    };

    const response = {
      token: jwt.sign(payload, variables.JWT_TOKEN, { expiresIn: payload.expiresIn }),
    };

    return this.response(GenerateTokenResDto, response);
  }

  async postUploadFile(req: Request, file: Express.Multer.File) {
    return file;
  }
}
