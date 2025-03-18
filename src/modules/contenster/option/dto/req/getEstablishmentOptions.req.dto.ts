import { Transform } from 'class-transformer';
import { ValidateIf, IsNumber } from 'class-validator';

import { parseNum } from 'src/shared/utils/convertion.utils';
import { OptionsReqDto } from 'src/shared/dtos/options.req.dto';

export class GetEstablishmentOptionsReqDto extends OptionsReqDto {
  @Transform(parseNum)
  @ValidateIf((_, value) => value !== null && value !== undefined)
  @IsNumber({}, { message: 'validation.invalidNumber' })
  userId?: number;
}
