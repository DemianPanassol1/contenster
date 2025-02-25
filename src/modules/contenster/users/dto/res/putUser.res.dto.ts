import { Expose } from 'class-transformer';

export class PutUserResDto {
  @Expose()
  id: number;
}
