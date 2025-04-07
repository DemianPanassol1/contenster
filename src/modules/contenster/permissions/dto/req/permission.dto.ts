import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

import { parseBool, parseNum } from 'src/shared/utils/convertion.utils';
import { PermissionType } from 'src/entities/contensterdb/permission.entity';

export class PermissionDto {
  @Transform(parseNum)
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsNumber({}, { message: 'validation.invalidNumber' })
  id: number;

  @Transform(parseNum)
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsNumber({}, { message: 'validation.invalidNumber' })
  functionalityId: number;

  @Transform(parseNum)
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsNumber({}, { message: 'validation.invalidNumber' })
  establishmentId: number;

  @Transform(parseNum)
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsNumber({}, { message: 'validation.invalidNumber' })
  roleId: number;

  @Transform(parseBool)
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsBoolean({ message: 'validation.invalidBoolean' })
  canRead: boolean;

  @Transform(parseBool)
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsBoolean({ message: 'validation.invalidBoolean' })
  canCreate: boolean;

  @Transform(parseBool)
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsBoolean({ message: 'validation.invalidBoolean' })
  canUpdate: boolean;

  @Transform(parseBool)
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsBoolean({ message: 'validation.invalidBoolean' })
  canDelete: boolean;

  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsEnum(PermissionType, { message: 'validation.invalidPermissionType' })
  permissionType: PermissionType;
}
