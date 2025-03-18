import { OmitType } from '@nestjs/swagger';

import { EmailSettingDto } from './emailSetting.dto';

export class PostEmailSettingReqDto extends OmitType(EmailSettingDto, ['id'] as const) {}
