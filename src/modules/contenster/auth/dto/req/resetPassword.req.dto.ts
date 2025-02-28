import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResetPasswordReqDto {
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsEmail({}, { message: 'validation.invalidEmail' })
  email: string;
}
