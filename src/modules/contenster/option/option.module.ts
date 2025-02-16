import { TypeOrmModule } from '@nestjs/typeorm';
import { Module as ModuleMod } from '@nestjs/common';

import { OptionService } from './option.service';
import { OptionRepository } from './option.repository';
import { OptionController } from './option.controller';

import { User } from 'src/entities/contensterdb/user.entity';
import { Role } from 'src/entities/contensterdb/role.entity';
import { Module } from 'src/entities/contensterdb/module.entity';
import { Establishment } from 'src/entities/contensterdb/establishment.entity';
import { Functionality } from 'src/entities/contensterdb/functionality.entity';

@ModuleMod({
  imports: [TypeOrmModule.forFeature([User, Establishment, Module, Role, Functionality])],
  controllers: [OptionController],
  providers: [OptionService, OptionRepository],
})
export class OptionModule {}
