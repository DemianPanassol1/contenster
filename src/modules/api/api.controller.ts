import { ApiBearerAuth } from '@nestjs/swagger';
import { Body, Controller, Get, Post } from '@nestjs/common';

import { ApiService } from './api.service';
import { GenerateTokenDto } from './dto/generateToken.dto';
import { Authorize } from 'src/common/interceptors/authorized.interceptor';
import { GenerateTokenResponseDto } from './dto/generateToken.response.dto';
import { ValidateTokenResponseDto } from './dto/validateToken.response.dto';

@Controller({ version: '1' })
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post('generate-token')
  getGenerateToken(@Body() body: GenerateTokenDto): GenerateTokenResponseDto {
    return this.apiService.getGenerateToken(body);
  }

  @Authorize()
  @ApiBearerAuth('Bearer-JWT')
  @Get('validate-token')
  getValidateToken(): ValidateTokenResponseDto {
    return this.apiService.getValidateToken();
  }
}
