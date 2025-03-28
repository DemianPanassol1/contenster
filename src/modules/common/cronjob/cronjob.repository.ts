import { LessThanOrEqual, Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CoreRepository } from 'src/core/core.repository';
import { LoglevelType } from 'src/shared/enums/common.enums';

import { Image } from 'src/entities/contensterdb/image.entity';
import { CronJobLog } from 'src/entities/contensterdb/cronjobLog.entity';
import { RequestLog } from 'src/entities/contensterdb/requestLog.entity';

@Injectable()
export class CronJobRepository extends CoreRepository {
  constructor(
    public readonly i18n: I18nService,
    @InjectRepository(Image) private imageRepo: Repository<Image>,
    @InjectRepository(CronJobLog) private cronRepo: Repository<CronJobLog>,
    @InjectRepository(RequestLog) private requestRepo: Repository<RequestLog>,
  ) {
    super(i18n);
  }

  getImagesByDate(date: Date): Promise<Image[]> {
    return this.imageRepo.find({ where: { createdAt: LessThanOrEqual(date) } });
  }

  removeImage(image: Image): Promise<Image> {
    return this.imageRepo.remove(image);
  }

  saveCronLog(cronLog: CronJobLog): Promise<CronJobLog> {
    return this.cronRepo.save(cronLog);
  }

  getLogsByTypeAndDate(type: LoglevelType, date: Date): Promise<RequestLog[]> {
    return this.requestRepo.find({ where: { logLevel: type, createdAt: LessThanOrEqual(date) } });
  }

  removeLogsBatch(log: RequestLog[]): Promise<RequestLog[]> {
    return this.requestRepo.remove(log);
  }
}
