import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FunctionalitiesService } from './functionalities.service';
import { FunctionalitiesController } from './functionalities.controller';
import { FunctionalitiesRepository } from './functionalities.repository';

import { Permission } from 'src/entities/contensterdb/permission.entity';
import { Functionality } from 'src/entities/contensterdb/functionality.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Functionality, Permission])],
  controllers: [FunctionalitiesController],
  providers: [FunctionalitiesService, FunctionalitiesRepository],
})
export class FunctionalitiesModule {}
