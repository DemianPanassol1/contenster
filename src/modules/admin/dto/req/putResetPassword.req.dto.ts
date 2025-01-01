import { IsNotEmpty } from 'class-validator';

export class PutResetPasswordReqDto {
  @IsNotEmpty({ message: 'validation.notEmpty' })
  oldPassword: string;

  @IsNotEmpty({ message: 'validation.notEmpty' })
  newPassword: string;
}
