import { Expose } from 'class-transformer';

export class PostResetPasswordResDto {
  @Expose()
  emailSent: boolean;
}
