import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CoreRepository } from 'src/core/core.repository';

import { GetMessagesListReqDto } from './dto/req/getMessagesList.req.dto';

import { Message } from 'src/entities/portfoliodb/message.entity';

@Injectable()
export class MessagesRepository extends CoreRepository {
  constructor(
    public readonly i18n: I18nService,
    @InjectRepository(Message, 'portfoliodb') private messageRepo: Repository<Message>,
  ) {
    super(i18n);
  }

  getMessagesPaginated(query: GetMessagesListReqDto): Promise<[Message[], number]> {
    return this.messageRepo.findAndCount({});
  }

  getMessageById(id: number): Promise<Message> {
    return this.messageRepo.findOne({
      where: { id },
      relations: {},
    });
  }

  saveMessage(message: Message): Promise<Message> {
    return this.messageRepo.save(message);
  }

  removeMessage(message: Message): Promise<Message> {
    return this.messageRepo.remove(message);
  }
}
