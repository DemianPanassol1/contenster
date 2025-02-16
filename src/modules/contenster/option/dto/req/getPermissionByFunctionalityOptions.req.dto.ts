import { Allow } from 'class-validator';
import { Transform } from 'class-transformer';

import { parseNum } from 'src/shared/utils/convertion.utils';
import { OptionsReqDto } from 'src/shared/dtos/options.req.dto';

export class GetPermissionByFunctionalityOptionsReqDto extends OptionsReqDto {
  @Allow()
  @Transform(parseNum)
  establishmentId: number = null;

  @Allow()
  @Transform(parseNum)
  roleId: number = null;

  @Allow()
  @Transform(parseNum)
  functionalityId: number = null;
}
