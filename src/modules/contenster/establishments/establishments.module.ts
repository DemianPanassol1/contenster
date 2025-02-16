import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EstablishmentsService } from './establishments.service';
import { EstablishmentsController } from './establishments.controller';
import { EstablishmentsRepository } from './establishments.repository';

import { Establishment } from 'src/entities/contensterdb/establishment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Establishment])],
  controllers: [EstablishmentsController],
  providers: [EstablishmentsService, EstablishmentsRepository],
})
export class EstablishmentsModule {}
