import { Expose } from 'class-transformer';

export class PutUserInfoResDto {
  @Expose()
  id: number;
}
