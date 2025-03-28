import { I18nService } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';

import { CoreService } from 'src/core/core.service';
import { MessagesRepository } from './messages.repository';

import { GetMessageReqDto } from './dto/req/getMessage.req.dto';
import { PutMessageReqDto } from './dto/req/putMessage.req.dto';
import { DeleteMessageReqDto } from './dto/req/deleteMessage.req.dto';
import { GetMessagesListReqDto } from './dto/req/getMessagesList.req.dto';
import { PostWebsiteMessageReqDto } from './dto/req/postWebsiteMessage.req.dto';

import { GetMessageResDto } from './dto/res/getMessage.res.dto';
import { PutMessageResDto } from './dto/res/putMessage.res.dto';
import { DeleteMessageResDto } from './dto/res/deleteMessage.res.dto';
import { GetMessagesListResDto } from './dto/res/getMessagesList.res.dto';
import { PostWebsiteMessageResDto } from './dto/res/postWebsiteMessage.res.dto';

import { Message } from 'src/entities/portfoliodb/message.entity';

@Injectable()
export class MessagesService extends CoreService {
  constructor(
    i18n: I18nService,
    private readonly repo: MessagesRepository,
  ) {
    super(i18n);
  }

  async getMessagesList(body: GetMessagesListReqDto) {
    const [data, total] = await this.repo.getMessagesPaginated(body);

    const response = {
      data: data,
      meta: {
        ...body,
        totalItems: total,
        totalPages: Math.ceil(total / body.pageSize),
        hasNextPage: total > body.pageNumber * body.pageSize,
      },
    };

    return this.response(GetMessagesListResDto, response);
  }

  async getMessage(query: GetMessageReqDto) {
    const { id } = query;

    const message = await this.repo.getMessageById(id);

    if (!message) {
      throw new Error(this.i18n.t('errors.messageNotFound'));
    }

    const response = {
      ...message,
    };

    return this.response(GetMessageResDto, response);
  }

  async putMessage(body: PutMessageReqDto) {
    const { id, read } = body;

    const saveMessage: Partial<Message> = {
      id,
      read,
    };

    const response = await this.repo.saveMessage(saveMessage);

    return this.response(PutMessageResDto, response);
  }

  async deleteMessage(query: DeleteMessageReqDto) {
    const { id } = query;

    const message = await this.repo.getMessageById(id);

    if (!message) {
      throw new Error(this.i18n.t('errors.messageNotFound'));
    }

    const response = await this.repo.removeMessage(message);

    return this.response(DeleteMessageResDto, response);
  }

  async postWebsiteMessage(body: PostWebsiteMessageReqDto) {
    const { name, email, phone, content, subject } = body;

    const saveMessage: Partial<Message> = {
      name,
      email,
      phone,
      content,
      subject,
    };

    const savedMessage = await this.repo.saveMessage(saveMessage);

    const response = {
      sended: !!savedMessage,
    };

    return this.response(PostWebsiteMessageResDto, response);
  }
}
