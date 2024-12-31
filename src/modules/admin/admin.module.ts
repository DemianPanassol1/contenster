import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminRepository } from './admin.repository';

import { User } from 'src/entities/contensterdb/user.entity';
import { Establishment } from 'src/entities/contensterdb/establishment.entity';
import { UserEstablishmentRole } from 'src/entities/contensterdb/userEstablishmentRole.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Establishment, UserEstablishmentRole])],
  controllers: [AdminController],
  providers: [AdminService, AdminRepository],
})
export class AdminModule {}
