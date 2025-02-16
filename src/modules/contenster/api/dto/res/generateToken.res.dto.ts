import { Expose } from 'class-transformer';

export class GenerateTokenResDto {
  @Expose()
  token: string;
}
