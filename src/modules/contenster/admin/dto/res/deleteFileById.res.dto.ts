import { Expose } from 'class-transformer';

export class DeleteFileByIdResDto {
  @Expose()
  id: number;
}
