import { OmitType } from '@nestjs/swagger';

import { MessageDto } from './message.dto';

export class PostWebsiteMessageReqDto extends OmitType(MessageDto, ['id'] as const) {}
