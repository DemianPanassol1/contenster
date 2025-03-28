import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CoreRepository } from 'src/core/core.repository';

import { Message } from 'src/entities/portfoliodb/message.entity';

@Injectable()
export class MessagesRepository extends CoreRepository {
  constructor(
    public readonly i18n: I18nService,
    @InjectRepository(Message) private messageRepo: Repository<Message>,
  ) {
    super(i18n);
  }
}
