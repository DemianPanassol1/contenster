import { Expose } from 'class-transformer';

export class PostAuthorizeResDto {
  @Expose()
  value: string;

  @Expose()
  label: string;
}
