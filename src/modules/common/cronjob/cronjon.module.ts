import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CronJobService } from './cronjob.service';
import { CronJobRepository } from './cronjob.repository';

import { Image } from 'src/entities/contensterdb/image.entity';
import { CronJobLog } from 'src/entities/contensterdb/cronjobLog.entity';
import { RequestLog } from 'src/entities/contensterdb/requestLog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Image, CronJobLog, RequestLog])],
  controllers: [],
  providers: [CronJobService, CronJobRepository],
})
export class CronJobModule {}
