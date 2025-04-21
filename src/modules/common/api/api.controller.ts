import { ApiBearerAuth } from '@nestjs/swagger';
import { Body, Controller, Get, Post } from '@nestjs/common';

import { ApiService } from './api.service';
import { Authorize } from 'src/common/guards/authorize.guard';

import { GenerateTokenReqDto } from './dto/req/generateToken.req.dto';

@Controller({ version: '1' })
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post('generate-token')
  getGenerateToken(@Body() body: GenerateTokenReqDto) {
    return this.apiService.getGenerateToken(body);
  }

  @Authorize()
  @ApiBearerAuth('Bearer-JWT')
  @Get('validate-token')
  getValidateToken() {
    return this.apiService.getValidateToken();
  }
}
