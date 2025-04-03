import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';

import { User } from 'src/entities/contensterdb/user.entity';
import { Configuration } from 'src/entities/contensterdb/configuration.entity';
import { UserEstablishmentRole } from 'src/entities/contensterdb/userEstablishmentRole.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserEstablishmentRole, Configuration], 'contensterdb')],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
})
export class AuthModule {}
