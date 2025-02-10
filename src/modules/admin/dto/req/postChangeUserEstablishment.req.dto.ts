import { IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

import { parseNum } from 'src/shared/utils/convertion.utils';

export class PostChangeUserEstablishmentReqDto {
  @Transform(parseNum)
  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  establishmentId: number;
}
