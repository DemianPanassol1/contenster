import { IsNotEmpty } from 'class-validator';

export class CreatePasswordReqDto {
  @IsNotEmpty({ message: 'validation.notEmpty' })
  password: string;

  @IsNotEmpty({ message: 'validation.notEmpty' })
  token: string;
}
