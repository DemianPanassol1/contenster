import { Request } from 'express';
import { Body, Controller, Post, Req } from '@nestjs/common';

import { FunctionalitiesService } from './functionalities.service';

import { Authorize } from 'src/common/interceptors/authorize.interceptor';

import { GetFunctionalitiesListReqDto } from './dto/req/getFunctionalitiesList.req.dto';

@Authorize()
@Controller({ version: '1' })
export class FunctionalitiesController {
  constructor(private readonly functionalitiesService: FunctionalitiesService) {}

  @Post('get-functionalities-list')
  async getFunctionalitiesList(@Req() req: Request, @Body() body: GetFunctionalitiesListReqDto) {
    return await this.functionalitiesService.getFunctionalitiesList(req, body);
  }
}
