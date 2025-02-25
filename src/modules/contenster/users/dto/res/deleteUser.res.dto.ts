import { Expose } from 'class-transformer';

export class DeleteUserResDto {
  @Expose()
  id: number;
}
