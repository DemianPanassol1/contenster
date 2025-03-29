import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MessagesRepository } from './messages.repository';

import { Message } from 'src/entities/portfoliodb/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message], 'portfoliodb')],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesRepository],
})
export class MessagesModule {}
