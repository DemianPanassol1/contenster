import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, ValidateIf } from 'class-validator';

import { OptionsReqDto } from 'src/shared/dtos/options.req.dto';
import { parseBool, parseNum } from 'src/shared/utils/convertion.utils';

export class GetModuleOptionsReqDto extends OptionsReqDto {
  @Transform(parseNum)
  @ValidateIf((_, value) => value !== null && value !== undefined)
  @IsNumber({}, { message: 'validation.invalidNumber' })
  establishmentId: number;

  @Transform(parseBool)
  @ValidateIf((_, value) => value !== null && value !== undefined)
  @IsBoolean({ message: 'validation.invalidBoolean' })
  establishmentIdRequired: boolean;
}
