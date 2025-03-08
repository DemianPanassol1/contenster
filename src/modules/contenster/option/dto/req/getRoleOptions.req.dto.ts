import { Transform } from 'class-transformer';
import { IsNumber, ValidateIf } from 'class-validator';

import { parseNum } from 'src/shared/utils/convertion.utils';
import { OptionsReqDto } from 'src/shared/dtos/options.req.dto';

export class GetRoleOptionsReqDto extends OptionsReqDto {
  @Transform(parseNum)
  @ValidateIf((_, value) => value !== null && value !== undefined)
  @IsNumber({}, { message: 'validation.invalidNumber' })
  establishmentId: number = null;
}
