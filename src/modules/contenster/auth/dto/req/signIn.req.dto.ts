import { Transform } from 'class-transformer';
import { MinLength, IsBoolean, IsNotEmpty, IsString, Allow } from 'class-validator';

import { parseBool, parseNum } from 'src/shared/utils/convertion.utils';

export class SignInUserReqDto {
  @IsString({ message: 'validation.invalidString' })
  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  username: string;

  @IsString({ message: 'validation.invalidString' })
  @MinLength(5, { message: 'validation.min' })
  password: string;

  @Allow()
  @Transform(parseNum)
  establishmentId: number = null;

  @IsBoolean({ message: 'validation.invalidBoolean' })
  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  @Transform(parseBool)
  staySign: boolean;
}
