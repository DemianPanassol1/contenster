import { Request } from 'express';
import { Body, Controller, Delete, Get, Post, Put, Query, Req } from '@nestjs/common';

import { Authorize } from 'src/common/interceptors/authorize.interceptor';

import { EstablishmentsService } from './establishments.service';

import { GetEstablishmentReqDto } from './dto/req/getEstablishment.req.dto';
import { PutEstablishmentReqDto } from './dto/req/putEstablishment.req.dto';
import { PostEstablishmentReqDto } from './dto/req/postEstablishment.req.dto';
import { DeleteEstablishmentReqDto } from './dto/req/deleteEstablishment.req.dto';
import { GetEstablishmentsListReqDto } from './dto/req/getEstablishmentsList.req.dto';

@Authorize()
@Controller({ version: '1' })
export class EstablishmentsController {
  constructor(private readonly establishmentsService: EstablishmentsService) {}

  @Post('get-establishments-list')
  async getEstablishmentsList(@Body() body: GetEstablishmentsListReqDto) {
    return await this.establishmentsService.getEstablishmentsList(body);
  }

  @Get('get-establishment')
  async getEstablishment(@Req() req: Request, @Query() query: GetEstablishmentReqDto) {
    return await this.establishmentsService.getEstablishment(req, query);
  }

  @Post('post-establishment')
  async postEstablishment(@Body() body: PostEstablishmentReqDto) {
    return await this.establishmentsService.postEstablishment(body);
  }

  @Put('put-establishment')
  async putEstablishment(@Body() body: PutEstablishmentReqDto) {
    return await this.establishmentsService.putEstablishment(body);
  }

  @Delete('delete-establishment')
  async deleteEstablishment(@Query() query: DeleteEstablishmentReqDto) {
    return await this.establishmentsService.deleteEstablishment(query);
  }
}
