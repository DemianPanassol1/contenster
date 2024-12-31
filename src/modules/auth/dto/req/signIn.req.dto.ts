import { Transform } from 'class-transformer';
import { MinLength, IsBoolean, IsNotEmpty, IsString, Allow } from 'class-validator';

import { parseBool, parseNum } from 'src/shared/utils/convertion.utils';

export class SignInUserReqDto {
  @IsString()
  @IsNotEmpty({ message: 'validation.notEmpty' })
  username: string;

  @IsString()
  @MinLength(5, { message: 'validation.min' })
  password: string;

  @Allow()
  @Transform(parseNum)
  establishmentId: number;

  @IsBoolean()
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @Transform(parseBool)
  staySign: boolean;
}
