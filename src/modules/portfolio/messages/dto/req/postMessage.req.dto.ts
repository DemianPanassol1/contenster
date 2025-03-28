import { OmitType } from '@nestjs/swagger';

import { MessageDto } from './message.dto';

export class PostMessageReqDto extends OmitType(MessageDto, ['id'] as const) {}
