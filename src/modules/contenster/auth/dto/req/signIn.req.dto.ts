import { Transform } from 'class-transformer';
import { MinLength, IsBoolean, IsNotEmpty, IsString, IsNumber, ValidateIf } from 'class-validator';

import { parseBool, parseNum } from 'src/shared/utils/convertion.utils';

export class SignInUserReqDto {
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsString({ message: 'validation.invalidString' })
  username: string;

  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsString({ message: 'validation.invalidString' })
  @MinLength(5, { message: 'validation.min' })
  password: string;

  @Transform(parseNum)
  @ValidateIf((_, value) => value !== null && value !== undefined)
  @IsNumber({}, { message: 'validation.invalidNumber' })
  establishmentId?: number;

  @Transform(parseBool)
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsBoolean({ message: 'validation.invalidBoolean' })
  staySign: boolean;
}
