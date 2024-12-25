import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateTokenDto {
  @IsString()
  @IsNotEmpty({ message: 'Login is required' })
  login!: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password!: string;
}
