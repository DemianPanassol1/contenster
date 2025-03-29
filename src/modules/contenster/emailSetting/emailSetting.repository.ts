import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nContext, I18nService } from 'nestjs-i18n';

import { CoreRepository } from 'src/core/core.repository';
import { EmailPurpose, PermissionType } from 'src/shared/enums/common.enums';

import { Translation } from 'src/entities/contensterdb/translation.entity';
import { EmailSetting } from 'src/entities/contensterdb/emailSetting.entity';

import { GetEmailSettingListReqDto } from './dto/req/getEmailSettingList.req.dto';

@Injectable()
export class EmailSettingRepository extends CoreRepository {
  constructor(
    public readonly i18n: I18nService,
    @InjectRepository(Translation, 'contensterdb') private translationRepo: Repository<Translation>,
    @InjectRepository(EmailSetting, 'contensterdb')
    private emailSettingRepo: Repository<EmailSetting>,
  ) {
    super(i18n);
  }

  getEmailSettingPaginated(query: GetEmailSettingListReqDto): Promise<[EmailSetting[], number]> {
    const { permissionType, establishmentId } = query;

    return this.emailSettingRepo.findAndCount({
      ...this.buildFilter(query, {
        establishment: {
          id: permissionType === PermissionType['establishment'] ? establishmentId : null,
        },
        titles: { language: { languageCode: I18nContext.current().lang } },
      }),
      relations: {
        establishment: true,
        titles: { language: true },
      },
    });
  }

  getEmailSettingById(id: number): Promise<EmailSetting> {
    return this.emailSettingRepo.findOne({
      where: { id },
      relations: {
        establishment: true,
        titles: { language: true },
        footers: { language: true },
        subjects: { language: true },
        contents: { language: true },
      },
    });
  }

  getEmailSettingByPurpose(purpose: EmailPurpose, establishmentId: number): Promise<EmailSetting> {
    return this.emailSettingRepo.findOne({
      where: { purpose, establishment: { id: establishmentId } },
    });
  }

  saveEmailSetting(emailSetting: EmailSetting): Promise<EmailSetting> {
    return this.emailSettingRepo.save(emailSetting);
  }

  async removeEmailSetting(emailSetting: EmailSetting): Promise<EmailSetting> {
    await this.emailSettingRepo.remove(emailSetting);

    await this.translationRepo.remove([
      ...emailSetting.titles,
      ...emailSetting.footers,
      ...emailSetting.subjects,
      ...emailSetting.contents,
    ]);

    return emailSetting;
  }
}
