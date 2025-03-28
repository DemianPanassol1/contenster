import { Expose } from 'class-transformer';

export class ValidateTokenResDto {
  @Expose()
  validated: boolean;
}
