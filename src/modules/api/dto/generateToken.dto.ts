import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateTokenDto {
  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  login: string;

  @IsString()
  @IsNotEmpty({ message: 'validation.NOT_EMPTY' })
  password: string;
}
