import { Throttle } from '@nestjs/throttler';
import { Controller, Get, Post, Body, Delete, Query, Put } from '@nestjs/common';

import { MessagesService } from './messages.service';
import { Authorize } from 'src/common/interceptors/authorize.interceptor';

import { GetMessageReqDto } from './dto/req/getMessage.req.dto';
import { PutMessageReqDto } from './dto/req/putMessage.req.dto';
import { DeleteMessageReqDto } from './dto/req/deleteMessage.req.dto';
import { GetMessagesListReqDto } from './dto/req/getMessagesList.req.dto';
import { PostWebsiteMessageReqDto } from './dto/req/postWebsiteMessage.req.dto';

@Controller({ version: '1' })
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Authorize()
  @Post('admin/get-messages-list')
  async getMessagesList(@Body() body: GetMessagesListReqDto) {
    return await this.messagesService.getMessagesList(body);
  }

  @Authorize()
  @Get('admin/get-message')
  async getMessage(@Query() query: GetMessageReqDto) {
    return await this.messagesService.getMessage(query);
  }

  @Authorize()
  @Put('admin/put-message')
  async putMessage(@Body() body: PutMessageReqDto) {
    return await this.messagesService.putMessage(body);
  }

  @Authorize()
  @Delete('admin/delete-message')
  async deleteMessage(@Query() query: DeleteMessageReqDto) {
    return await this.messagesService.deleteMessage(query);
  }

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post('website/post-message')
  async postMessage(@Body() body: PostWebsiteMessageReqDto) {
    return await this.messagesService.postWebsiteMessage(body);
  }
}
