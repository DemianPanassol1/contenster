import { IsString } from 'class-validator';

export class GenerateTokenResponseDto {
  @IsString()
  token!: string;
}
