import { Module } from '@nestjs/common';
import { FunctionalitiesController } from './functionalities.controller';
import { FunctionalitiesService } from './functionalities.service';

@Module({
  controllers: [FunctionalitiesController],
  providers: [FunctionalitiesService],
})
export class FunctionalitiesModule {}
