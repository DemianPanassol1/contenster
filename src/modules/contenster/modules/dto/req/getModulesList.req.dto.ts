import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, ValidateIf } from 'class-validator';

import { parseNum } from 'src/shared/utils/convertion.utils';
import { OptionsReqDto } from 'src/shared/dtos/options.req.dto';
import { PermissionType } from 'src/entities/contensterdb/permission.entity';

export class GetModulesListReqDto extends OptionsReqDto {
  @Transform(parseNum)
  @ValidateIf(
    (obj, value) =>
      obj.permissionType === PermissionType['establishment'] ||
      (value !== null && value !== undefined),
  )
  @IsNumber({}, { message: 'validation.invalidNumber' })
  establishmentId?: number;

  @ValidateIf((_, value) => value !== null && value !== undefined)
  @IsEnum(PermissionType, { message: 'validation.invalidPermissionType' })
  permissionType?: PermissionType;
}
