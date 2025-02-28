import { Transform } from 'class-transformer';
import { Allow, IsEmail, IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

import { parseNum } from 'src/shared/utils/convertion.utils';

export class PutUserInfoReqDto {
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @Transform(parseNum)
  @IsNumber({}, { message: 'validation.invalidNumber' })
  id: number;

  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsString({ message: 'validation.invalidString' })
  name: string;

  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsString({ message: 'validation.invalidString' })
  username: string;

  @IsNotEmpty({ message: 'validation.notEmpty' })
  @Transform(({ value }) => value.replace(/[^\d]/g, ''))
  @IsString({ message: 'validation.invalidString' })
  phone: string;

  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsEmail({}, { message: 'validation.invalidEmail' })
  email: string;

  @Allow()
  @Transform(parseNum)
  @ValidateIf((_, value) => value !== null && value !== undefined)
  @IsNumber({}, { message: 'validation.invalidNumber' })
  imageId: number;

  @Allow()
  @Transform(parseNum)
  @ValidateIf((_, value) => value !== null && value !== undefined)
  @IsNumber({}, { message: 'validation.invalidNumber' })
  preferenceId: number;
}
