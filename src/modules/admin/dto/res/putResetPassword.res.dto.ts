import { Expose } from 'class-transformer';

export class PutResetPasswordResDto {
  @Expose()
  passwordReseted: boolean;
}
