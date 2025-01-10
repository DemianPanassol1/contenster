import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminRepository } from './admin.repository';

import { User } from 'src/entities/contensterdb/user.entity';
import { Image } from 'src/entities/contensterdb/image.entity';
import { Establishment } from 'src/entities/contensterdb/establishment.entity';
import { UserEstablishmentRole } from 'src/entities/contensterdb/userEstablishmentRole.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Establishment, UserEstablishmentRole, Image])],
  controllers: [AdminController],
  providers: [Logger, AdminService, AdminRepository],
})
export class AdminModule {}
