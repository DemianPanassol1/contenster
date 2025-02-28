import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePasswordReqDto {
  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  @IsString({ message: 'validation.invalidString' })
  password: string;

  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  @IsString({ message: 'validation.invalidString' })
  token: string;
}
