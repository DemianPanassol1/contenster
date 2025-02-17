import { Expose } from 'class-transformer';

export class PutModuleResDto {
  @Expose()
  id: number;
}
