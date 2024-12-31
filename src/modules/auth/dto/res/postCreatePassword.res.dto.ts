import { Expose } from 'class-transformer';

export class PostCreatePasswordResDto {
  @Expose()
  passwordReseted: boolean;
}
