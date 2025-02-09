import { IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

import { parseNum } from '../utils/convertion.utils';

export class GetByIdReqDto {
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @Transform(parseNum)
  id: number;
}
