import { IsNotEmpty, IsString } from 'class-validator';

export class PutResetPasswordReqDto {
  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsString({ message: 'validation.invalidString' })
  oldPassword: string;

  @IsNotEmpty({ message: 'validation.notEmpty' })
  @IsString({ message: 'validation.invalidString' })
  newPassword: string;
}
