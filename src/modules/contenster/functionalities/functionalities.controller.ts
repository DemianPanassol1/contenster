import { Request } from 'express';
import { Body, Controller, Delete, Get, Post, Put, Query, Req } from '@nestjs/common';

import { FunctionalitiesService } from './functionalities.service';

import { Authenticate } from 'src/common/guards/authenticate.guard';

import { GetFunctionalityReqDto } from './dto/req/getFunctionality.req.dto';
import { PutFunctionalityReqDto } from './dto/req/putFunctionality.req.dto';
import { PostFunctionalityReqDto } from './dto/req/postFunctionality.req.dto';
import { DeleteFunctionalityReqDto } from './dto/req/deleteFunctionality.req.dto';
import { GetFunctionalitiesListReqDto } from './dto/req/getFunctionalitiesList.req.dto';

@Authenticate()
@Controller({ version: '1' })
export class FunctionalitiesController {
  constructor(private readonly functionalitiesService: FunctionalitiesService) {}

  @Post('get-functionalities-list')
  async getFunctionalitiesList(@Req() req: Request, @Body() body: GetFunctionalitiesListReqDto) {
    return await this.functionalitiesService.getFunctionalitiesList(req, body);
  }

  @Get('get-functionality')
  async getFunctionality(@Req() req: Request, @Query() query: GetFunctionalityReqDto) {
    return await this.functionalitiesService.getFunctionality(req, query);
  }

  @Post('post-functionality')
  async postFunctionality(@Body() body: PostFunctionalityReqDto) {
    return await this.functionalitiesService.postFunctionality(body);
  }

  @Put('put-functionality')
  async putFunctionality(@Body() body: PutFunctionalityReqDto) {
    return await this.functionalitiesService.putFunctionality(body);
  }

  @Delete('delete-functionality')
  async deleteFunctionality(@Query() query: DeleteFunctionalityReqDto) {
    return await this.functionalitiesService.deleteFunctionality(query);
  }
}
