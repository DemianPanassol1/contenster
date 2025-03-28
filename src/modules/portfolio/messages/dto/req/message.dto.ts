import { Transform } from 'class-transformer';
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

import { parseBool, parseNum } from 'src/shared/utils/convertion.utils';

export class MessageDto {
  @Transform(parseNum)
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsNumber({}, { message: 'validation.invalidNumber' })
  id: number;

  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsString({ message: 'validation.invalidString' })
  name: string;

  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsEmail({}, { message: 'validation.invalidEmail' })
  email: string;

  @Transform(({ value }) => value.replace(/\D/g, ''))
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsString({ message: 'validation.invalidString' })
  phone: string;

  @ValidateIf((_, value) => value !== null && value !== undefined)
  @IsString({ message: 'validation.invalidString' })
  subject: string;

  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsString({ message: 'validation.invalidString' })
  content: string;

  @Transform(parseBool)
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsBoolean({ message: 'validation.invalidBoolean' })
  read: boolean;
}
