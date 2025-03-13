import { Transform } from 'class-transformer';
import { IsNumber, ValidateIf } from 'class-validator';

import { parseNum } from 'src/shared/utils/convertion.utils';
import { GetByIdReqDto } from 'src/shared/dtos/getById.req.dto';

export class DeleteEstablishmentReqDto extends GetByIdReqDto {
  @Transform(parseNum)
  @ValidateIf((_, value) => value !== null && value !== undefined)
  @IsNumber({}, { message: 'validation.invalidNumber' })
  establishmentId: number;
}
