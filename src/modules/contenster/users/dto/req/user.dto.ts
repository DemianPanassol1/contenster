import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

import { PermissionType } from 'src/shared/enums/common.enums';
import { parseBool, parseNum } from 'src/shared/utils/convertion.utils';

class UserEstablishmentRole {
  @Transform(parseNum)
  @ValidateIf((_, value) => value !== null && value !== undefined)
  @IsNumber({}, { message: 'validation.invalidNumber' })
  id?: number;

  @Transform(parseNum)
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsNumber({}, { message: 'validation.invalidNumber' })
  roleId: number;

  @Transform(parseNum)
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsNumber({}, { message: 'validation.invalidNumber' })
  establishmentId: number;
}

export class UserDto {
  @Transform(parseNum)
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsNumber({}, { message: 'validation.invalidNumber' })
  id: number;

  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  @IsString({ message: 'validation.invalidString' })
  name: string;

  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  @IsString({ message: 'validation.invalidString' })
  email: string;

  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  @IsString({ message: 'validation.invalidString' })
  username: string;

  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  @IsString({ message: 'validation.invalidString' })
  phone: string;

  @Transform(parseBool)
  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  @IsBoolean({ message: 'validation.invalidBoolean' })
  isActive: boolean;

  @Transform(parseBool)
  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  @IsBoolean({ message: 'validation.invalidBoolean' })
  isBlocked: boolean;

  @ValidateIf((obj) => !obj.id)
  @IsString({ message: 'validation.invalidString' })
  password?: string;

  @ValidateIf((obj) => !obj.id)
  @IsString({ message: 'validation.invalidString' })
  repeatPassword?: string;

  @Transform(parseNum)
  @ValidateIf((_, value) => value !== null && value !== undefined)
  @IsNumber({}, { message: 'validation.invalidNumber' })
  imageId?: number;

  @IsArray({ message: 'validation.invalidArray' })
  @ValidateNested({ each: true })
  @Type(() => UserEstablishmentRole)
  userEstablishmentRole: UserEstablishmentRole[];

  @Transform(parseNum)
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsNumber({}, { message: 'validation.invalidNumber' })
  preferenceId: number;

  @Transform(parseNum)
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsNumber({}, { message: 'validation.invalidNumber' })
  roleId: number;

  @Transform(parseNum)
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsNumber({}, { message: 'validation.invalidNumber' })
  establishmentId: number;

  @IsEnum(PermissionType, { message: 'validation.invalidPermissionType' })
  permissionType: PermissionType;
}
