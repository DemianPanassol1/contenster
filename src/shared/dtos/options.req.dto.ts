import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

import { PaginateReqDto } from './paginate.req.dto';
import { parseBool } from '../utils/convertion.utils';

export class OptionsReqDto extends PaginateReqDto {
  @IsOptional()
  @Transform(parseBool)
  @IsBoolean({ message: 'validation.invalidBoolean' })
  optional: boolean = false;
}
