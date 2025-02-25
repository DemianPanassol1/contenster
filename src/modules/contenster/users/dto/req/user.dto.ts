import { Transform } from 'class-transformer';
import { Allow, IsBoolean, IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

import { parseBool, parseNum } from 'src/shared/utils/convertion.utils';

export class UserDto {
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @Transform(parseNum)
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

  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  @Transform(parseBool)
  @IsBoolean({ message: 'validation.invalidBoolean' })
  isActive: boolean;

  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  @Transform(parseBool)
  @IsBoolean({ message: 'validation.invalidBoolean' })
  isBlocked: boolean;

  @Allow()
  @Transform(parseNum)
  @ValidateIf((value) => value !== null && value !== undefined)
  @IsNumber({}, { message: 'validation.invalidNumber' })
  imageId: number;

  @Allow()
  @Transform(parseNum)
  @ValidateIf((value) => value !== null && value !== undefined)
  @IsNumber({}, { message: 'validation.invalidNumber' })
  preferenceId: number;
}
