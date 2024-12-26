import { Expose } from 'class-transformer';

export class ValidateTokenResponseDto {
  @Expose()
  validated: boolean;
}
