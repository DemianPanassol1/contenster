import { I18nService } from 'nestjs-i18n';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { CoreService } from 'src/core/core.service';
import { CronJobRepository } from './cronjob.repository';
import { LoglevelType } from 'src/shared/enums/common.enums';
import { miliToString } from 'src/shared/utils/convertion.utils';
import { CronJobLog } from 'src/entities/contensterdb/cronjobLog.entity';

@Injectable()
export class CronJobService extends CoreService {
  constructor(
    i18n: I18nService,
    private readonly repo: CronJobRepository,
  ) {
    super(i18n);
  }

  @Cron(CronExpression.EVERY_6_HOURS)
  async deleteOrphanedFiles() {
    const now = Date.now();

    const date = new Date(Date.now() - 10 * 60 * 1000); // 10 minutes ago

    const images = await this.repo.getImagesByDate(date);

    const imagesRemoved = [];
    const errors = [];

    for (const image of images) {
      try {
        const removedImage = await this.repo.removeImage(image);
        imagesRemoved.push(removedImage);
      } catch (error) {
        errors.push({ error, record: image });
      }
    }

    const cronjobLog: Partial<CronJobLog> = {
      jobName: 'deleteOrphanedFiles',
      executionTime: miliToString(Date.now() - now),
      result: { imagesRemoved },
      error: { errors },
    };

    await this.repo.saveCronLog(cronjobLog);
  }

  @Cron(CronExpression.EVERY_2_HOURS)
  async deleteInfoLogs() {
    const now = Date.now();

    const date = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000); // 14 days ago

    const logs = await this.repo.getLogsByTypeAndDate(LoglevelType.info, date);

    const logsRemoved = await this.repo.removeLogsBatch(logs);

    const cronjobLog: Partial<CronJobLog> = {
      jobName: 'deleteInfoLogs',
      executionTime: miliToString(Date.now() - now),
      result: { logsRemoved: logsRemoved.length },
    };

    await this.repo.saveCronLog(cronjobLog);
  }

  @Cron(CronExpression.EVERY_2_HOURS)
  async deleteWarningLogs() {
    const now = Date.now();

    const date = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 days ago

    const logs = await this.repo.getLogsByTypeAndDate(LoglevelType.warning, date);

    const logsRemoved = await this.repo.removeLogsBatch(logs);

    const cronjobLog: Partial<CronJobLog> = {
      jobName: 'deleteWarningLogs',
      executionTime: miliToString(Date.now() - now),
      result: { logsRemoved: logsRemoved.length },
    };

    await this.repo.saveCronLog(cronjobLog);
  }

  @Cron(CronExpression.EVERY_2_HOURS)
  async deleteErrorLogs() {
    const now = Date.now();

    const date = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000); // 90 days ago

    const logs = await this.repo.getLogsByTypeAndDate(LoglevelType.error, date);

    const logsRemoved = await this.repo.removeLogsBatch(logs);

    const cronjobLog: Partial<CronJobLog> = {
      jobName: 'deleteErrorLogs',
      executionTime: miliToString(Date.now() - now),
      result: { logsRemoved: logsRemoved.length },
    };

    await this.repo.saveCronLog(cronjobLog);
  }
}
