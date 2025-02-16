import { Body, Controller, Post } from '@nestjs/common';

import { Authorize } from 'src/common/interceptors/authorize.interceptor';

import { EstablishmentsService } from './establishments.service';
import { GetEstablishmentsListReqDto } from './dto/req/getEstablishmentsList.req.dto';

@Authorize()
@Controller({ version: '1' })
export class EstablishmentsController {
  constructor(private readonly establishmentsService: EstablishmentsService) {}

  @Post('get-establishments-list')
  async getEstablishmentsList(@Body() body: GetEstablishmentsListReqDto) {
    return await this.establishmentsService.getEstablishmentsList(body);
  }
}
