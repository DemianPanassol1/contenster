import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { RolesRepository } from './roles.repository';

import { Role } from 'src/entities/contensterdb/role.entity';
import { Permission } from 'src/entities/contensterdb/permission.entity';
import { UserEstablishmentRole } from 'src/entities/contensterdb/userEstablishmentRole.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission, UserEstablishmentRole])],
  controllers: [RolesController],
  providers: [RolesService, RolesRepository],
})
export class RolesModule {}
