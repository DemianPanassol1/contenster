import { IsNotEmpty } from 'class-validator';

export class PutResetPasswordReqDto {
  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  oldPassword: string;

  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  newPassword: string;
}
