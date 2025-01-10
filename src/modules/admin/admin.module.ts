import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminRepository } from './admin.repository';

import { Role } from 'src/entities/contensterdb/role.entity';
import { User } from 'src/entities/contensterdb/user.entity';
import { Image } from 'src/entities/contensterdb/image.entity';
import { Functionality } from 'src/entities/contensterdb/functionality.entity';
import { Establishment } from 'src/entities/contensterdb/establishment.entity';
import { UserEstablishmentRole } from 'src/entities/contensterdb/userEstablishmentRole.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Role,
      Image,
      Establishment,
      Functionality,
      UserEstablishmentRole,
    ]),
  ],
  controllers: [AdminController],
  providers: [Logger, AdminService, AdminRepository],
})
export class AdminModule {}
