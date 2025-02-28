import { Transform } from 'class-transformer';
import { IsBoolean, ValidateIf } from 'class-validator';

import { PaginateReqDto } from './paginate.req.dto';
import { parseBool } from '../utils/convertion.utils';

export class OptionsReqDto extends PaginateReqDto {
  @Transform(parseBool)
  @ValidateIf((_, value) => value !== null && value !== undefined)
  @IsBoolean({ message: 'validation.invalidBoolean' })
  optional: boolean = false;
}
