import { IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

import { parseNum } from '../utils/convertion.utils';

export class GetByIdReqDto {
  @Transform(parseNum)
  @IsNotEmpty({ message: 'validation.notEmpty' })
  id: number;
}
