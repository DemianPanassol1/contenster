import { IsBoolean } from 'class-validator';

export class ValidateTokenResponseDto {
  @IsBoolean()
  validated!: boolean;
}
