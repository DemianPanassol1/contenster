import { IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

import { parseNum } from 'src/shared/utils/convertion.utils';

export class PostChangeUserEstablishmentReqDto {
  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  @Transform(parseNum)
  establishmentId: number;
}
