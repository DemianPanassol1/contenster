import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmailSettingService } from './emailSetting.service';
import { EmailSettingController } from './emailSetting.controller';
import { EmailSettingRepository } from './emailSetting.repository';

import { Translation } from 'src/entities/contensterdb/translation.entity';
import { EmailSetting } from 'src/entities/contensterdb/emailSetting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmailSetting, Translation], 'contensterdb')],
  controllers: [EmailSettingController],
  providers: [EmailSettingService, EmailSettingRepository],
})
export class EmailSettingModule {}
