import { Allow } from 'class-validator';
import { Transform } from 'class-transformer';

import { parseNum } from 'src/shared/utils/convertion.utils';
import { OptionsReqDto } from 'src/shared/dtos/options.req.dto';

export class GetRoleOptionsReqDto extends OptionsReqDto {
  @Allow()
  @Transform(parseNum)
  establishmentId: number = null;
}
