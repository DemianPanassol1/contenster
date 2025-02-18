import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EstablishmentsService } from './establishments.service';
import { EstablishmentsController } from './establishments.controller';
import { EstablishmentsRepository } from './establishments.repository';

import { Role } from 'src/entities/contensterdb/role.entity';
import { Permission } from 'src/entities/contensterdb/permission.entity';
import { Establishment } from 'src/entities/contensterdb/establishment.entity';
import { Functionality } from 'src/entities/contensterdb/functionality.entity';
import { Module as ModuleEntity } from 'src/entities/contensterdb/module.entity';
import { UserEstablishmentRole } from 'src/entities/contensterdb/userEstablishmentRole.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Role,
      Permission,
      Establishment,
      Functionality,
      ModuleEntity,
      UserEstablishmentRole,
    ]),
  ],
  controllers: [EstablishmentsController],
  providers: [EstablishmentsService, EstablishmentsRepository],
})
export class EstablishmentsModule {}
