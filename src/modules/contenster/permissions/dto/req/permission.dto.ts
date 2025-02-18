import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

import { PermissionType } from 'src/shared/enums/common.enums';
import { parseBool, parseNum } from 'src/shared/utils/convertion.utils';

export class PermissionDto {
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @Transform(parseNum)
  @IsNumber({}, { message: 'validation.invalidNumber' })
  id: number;

  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  @Transform(parseNum)
  @IsNumber({}, { message: 'validation.invalidNumber' })
  functionalityId: number;

  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  @Transform(parseNum)
  @IsNumber({}, { message: 'validation.invalidNumber' })
  roleId: number;

  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  @Transform(parseBool)
  @IsBoolean({ message: 'validation.invalidBoolean' })
  canRead: boolean;

  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  @Transform(parseBool)
  @IsBoolean({ message: 'validation.invalidBoolean' })
  canCreate: boolean;

  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  @Transform(parseBool)
  @IsBoolean({ message: 'validation.invalidBoolean' })
  canUpdate: boolean;

  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  @Transform(parseBool)
  @IsBoolean({ message: 'validation.invalidBoolean' })
  canDelete: boolean;

  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  @IsEnum(PermissionType, { message: 'validation.invalidPermissionType' })
  permissionType: PermissionType;
}
