import { OmitType } from '@nestjs/swagger';

import { EstablishmentDto } from './establishment.dto';

export class PostEstablishmentReqDto extends OmitType(EstablishmentDto, ['id'] as const) {}
