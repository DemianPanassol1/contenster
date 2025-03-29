import { TypeOrmModule } from '@nestjs/typeorm';
import { Module as NestModule } from '@nestjs/common';

import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { ModulesRepository } from './modules.repository';

import { Module } from 'src/entities/contensterdb/module.entity';
import { Translation } from 'src/entities/contensterdb/translation.entity';

@NestModule({
  imports: [TypeOrmModule.forFeature([Module, Translation], 'contensterdb')],
  controllers: [ModulesController],
  providers: [ModulesService, ModulesRepository],
})
export class ModulesModule {}
