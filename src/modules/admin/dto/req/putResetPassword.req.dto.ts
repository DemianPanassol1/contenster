import { IsNotEmpty, IsString } from 'class-validator';

export class PutResetPasswordReqDto {
  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  @IsString({ message: 'validation.invalidString' })
  oldPassword: string;

  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  @IsString({ message: 'validation.invalidString' })
  newPassword: string;
}
