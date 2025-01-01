import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';

import { ApiService } from './api.service';
import multerInstance from 'src/config/multer/multer.config';
import { Authorize } from 'src/common/interceptors/authorize.interceptor';

import { GenerateTokenDto } from './dto/generateToken.dto';

@Controller({ version: '1' })
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post('generate-token')
  getGenerateToken(@Body() body: GenerateTokenDto) {
    return this.apiService.getGenerateToken(body);
  }

  @Authorize()
  @ApiBearerAuth('Bearer-JWT')
  @Get('validate-token')
  getValidateToken() {
    return this.apiService.getValidateToken();
  }

  @Authorize()
  @Post('upload-image')
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
  @UseInterceptors(FileInterceptor('file', multerInstance))
  async postUploadImage(@Req() req: Request, @UploadedFile() file: Express.Multer.File) {
    return await this.apiService.postUploadImage(req, file);
  }
}
