import { Expose } from 'class-transformer';

export class PostUserResDto {
  @Expose()
  id: number;
}
