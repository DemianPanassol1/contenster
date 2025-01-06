import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

import { PaginateReqDto } from './paginate.req.dto';
import { parseBool } from '../utils/convertion.utils';

export class OptionsReqDto extends PaginateReqDto {
  @IsOptional()
  @IsBoolean()
  @Transform(parseBool)
  optional: boolean = false;
}
