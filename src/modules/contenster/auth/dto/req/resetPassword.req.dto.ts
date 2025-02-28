import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResetPasswordReqDto {
  @IsNotEmpty({ message: 'validation.notEmptyTranslated' })
  @IsEmail({}, { message: 'validation.invalidEmail' })
  email: string;
}
