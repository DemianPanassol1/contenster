import { Expose } from 'class-transformer';

export class GenerateTokenResponseDto {
  @Expose()
  token: string;
}
