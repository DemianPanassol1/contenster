import { Expose } from 'class-transformer';

export class PutMessageResDto {
  @Expose()
  id: number;
}
