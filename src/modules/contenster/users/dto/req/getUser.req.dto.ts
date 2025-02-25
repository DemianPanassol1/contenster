import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

import { parseNum } from 'src/shared/utils/convertion.utils';
import { GetByIdReqDto } from 'src/shared/dtos/getById.req.dto';

export class GetUserReqDto extends GetByIdReqDto {
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @Transform(parseNum)
  @IsNumber({}, { message: 'validation.invalidNumber' })
  establishmentId: number;
}
