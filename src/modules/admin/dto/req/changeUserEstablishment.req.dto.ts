import { IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

import { parseNum } from 'src/shared/utils/convertion.utils';

export class ChangeUserEstablishmentReqDto {
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @Transform(parseNum)
  establishmentId: number;
}
