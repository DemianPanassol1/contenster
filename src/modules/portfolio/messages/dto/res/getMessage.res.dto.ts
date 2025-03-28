import { Expose } from 'class-transformer';

export class GetMessageResDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Expose()
  subject: string;

  @Expose()
  content: string;

  @Expose()
  read: boolean;
}
