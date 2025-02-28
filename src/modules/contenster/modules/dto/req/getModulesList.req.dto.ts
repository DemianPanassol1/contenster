import { Transform } from 'class-transformer';
import { Allow, IsEnum, IsNumber, ValidateIf } from 'class-validator';

import { parseNum } from 'src/shared/utils/convertion.utils';
import { PermissionType } from 'src/shared/enums/common.enums';
import { OptionsReqDto } from 'src/shared/dtos/options.req.dto';

export class GetModulesListReqDto extends OptionsReqDto {
  @Allow()
  @Transform(parseNum)
  @ValidateIf(
    (obj, value) =>
      obj.permissionType === PermissionType['establishment'] ||
      (value !== null && value !== undefined),
  )
  @IsNumber({}, { message: 'validation.invalidNumber' })
  establishmentId?: number;

  @Allow()
  @ValidateIf((_, value) => value !== null && value !== undefined)
  @IsEnum(PermissionType, { message: 'validation.invalidPermissionType' })
  permissionType?: PermissionType;
}
