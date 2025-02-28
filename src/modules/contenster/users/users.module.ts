import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';

import { User } from 'src/entities/contensterdb/user.entity';
import { Language } from 'src/entities/contensterdb/language.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Language])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
