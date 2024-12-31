import { IsEmail } from 'class-validator';

export class ResetPasswordReqDto {
  @IsEmail({}, { message: 'validation.invalidEmail' })
  email: string;
}
