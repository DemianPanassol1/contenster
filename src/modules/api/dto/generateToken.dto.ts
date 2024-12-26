import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateTokenDto {
  @IsNotEmpty({ message: 'validation.notEmpty' })
  login: string;

  @IsString()
  @IsNotEmpty({ message: 'validation.notEmpty' })
  password: string;
}
