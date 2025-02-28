import { IsNotEmpty, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

import { parseNum } from 'src/shared/utils/convertion.utils';

export class PostChangeUserEstablishmentReqDto {
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @Transform(parseNum)
  @IsNumber({}, { message: 'validation.invalidNumber' })
  establishmentId: number;
}
