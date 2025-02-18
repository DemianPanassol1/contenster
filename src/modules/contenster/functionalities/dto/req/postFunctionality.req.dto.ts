import { OmitType } from '@nestjs/swagger';

import { FunctionalityDto } from './functionality.dto';

export class PostFunctionalityReqDto extends OmitType(FunctionalityDto, ['id'] as const) {}
