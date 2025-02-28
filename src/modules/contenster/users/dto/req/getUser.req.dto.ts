import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

import { parseNum } from 'src/shared/utils/convertion.utils';
import { GetByIdReqDto } from 'src/shared/dtos/getById.req.dto';

export class GetUserReqDto extends GetByIdReqDto {
  @Transform(parseNum)
  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  @IsNumber({}, { message: 'validation.invalidNumber' })
  establishmentId: number;
}
