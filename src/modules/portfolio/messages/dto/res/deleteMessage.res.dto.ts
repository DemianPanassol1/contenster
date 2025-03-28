import { Expose } from 'class-transformer';

export class DeleteMessageResDto {
  @Expose()
  id: number;
}
