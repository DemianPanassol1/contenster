import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateTokenReqDto {
  @IsString({ message: 'validation.invalidString' })
  @IsNotEmpty({ message: 'validation.notEmpty' })
  login: string;

  @IsString({ message: 'validation.invalidString' })
  @IsNotEmpty({ message: 'validation.notEmpty' })
  password: string;
}
