import { I18nService } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';

import { CoreService } from 'src/core/core.service';
import { MessagesRepository } from './messages.repository';

import { GetMessageReqDto } from './dto/req/getMessage.req.dto';
import { PutMessageReqDto } from './dto/req/putMessage.req.dto';
import { DeleteMessageReqDto } from './dto/req/deleteMessage.req.dto';
import { GetMessagesListReqDto } from './dto/req/getMessagesList.req.dto';
import { PostWebsiteMessageReqDto } from './dto/req/postWebsiteMessage.req.dto';

@Injectable()
export class MessagesService extends CoreService {
  constructor(
    i18n: I18nService,
    private readonly repo: MessagesRepository,
  ) {
    super(i18n);
  }

  async getMessagesList(body: GetMessagesListReqDto) {
    throw new Error('Method not implemented.');
  }

  async getMessage(query: GetMessageReqDto) {
    throw new Error('Method not implemented.');
  }

  async putMessage(body: PutMessageReqDto) {
    throw new Error('Method not implemented.');
  }

  async deleteMessage(query: DeleteMessageReqDto) {
    throw new Error('Method not implemented.');
  }

  async postWebsiteMessage(body: PostWebsiteMessageReqDto) {
    throw new Error('Method not implemented.');
  }
}
