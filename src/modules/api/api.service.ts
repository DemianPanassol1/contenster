import jwt from 'jsonwebtoken';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import variables from 'src/settings';
import { CoreService } from 'src/core/core.service';
import { GenerateTokenDto } from './dto/generateToken.dto';
import { GenerateTokenResponseDto } from './dto/generateToken.response.dto';
import { ValidateTokenResponseDto } from './dto/validateToken.response.dto';

@Injectable()
export class ApiService extends CoreService {
  getValidateToken() {
    const response = { validated: true };

    return this.response(ValidateTokenResponseDto, response);
  }

  getGenerateToken(body: GenerateTokenDto) {
    const { login, password } = body;

    if (login !== variables.API_LOGIN || password !== variables.API_PASSWORD) {
      throw new HttpException('Unauthorized Message', HttpStatus.BAD_REQUEST);
    }

    const payload = {
      jwt: true,
      expiresIn: '1h',
      date: new Date(),
    };

    const response = {
      token: jwt.sign(payload, variables.JWT_TOKEN, { expiresIn: payload.expiresIn }),
    };

    return this.response(GenerateTokenResponseDto, response);
  }
}
