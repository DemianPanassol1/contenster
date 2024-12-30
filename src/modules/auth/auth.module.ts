import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';

import { User } from 'src/entities/contensterdb/user.entity';
import { Establishment } from 'src/entities/contensterdb/establishment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Establishment])],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
})
export class AuthModule {}
