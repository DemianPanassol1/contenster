import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nContext, I18nService } from 'nestjs-i18n';

import { CoreRepository } from 'src/core/core.repository';
import { PermissionType } from 'src/shared/enums/common.enums';
import { EmailSetting } from 'src/entities/contensterdb/emailSetting.entity';

import { GetEmailSettingListReqDto } from './dto/req/getEmailSettingList.req.dto';

@Injectable()
export class EmailSettingRepository extends CoreRepository {
  constructor(
    public readonly i18n: I18nService,
    @InjectRepository(EmailSetting) private emailSettingRepo: Repository<EmailSetting>,
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
        // footers: { language: { languageCode: I18nContext.current().lang } },
        // subjects: { language: { languageCode: I18nContext.current().lang } },
        // contents: { language: { languageCode: I18nContext.current().lang } },
      }),
      relations: {
        establishment: true,
        titles: { language: true },
        // footers: { language: true },
        // subjects: { language: true },
        // contents: { language: true },
      },
    });
  }
}
