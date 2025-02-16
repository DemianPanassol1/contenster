import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

import { parseNum } from 'src/shared/utils/convertion.utils';

import { GetByIdReqDto } from 'src/shared/dtos/getById.req.dto';

export class DeleteRoleReqDto extends GetByIdReqDto {
  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  @Transform(parseNum)
  @IsNumber({}, { message: 'validation.invalidNumber' })
  establishmentId: number;
}
