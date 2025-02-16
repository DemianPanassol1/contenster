import { Expose } from 'class-transformer';

export class GetUserInfoResDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  username: string;

  @Expose()
  phone: string;

  @Expose()
  imageId: string;

  @Expose()
  preferenceId: string;
}
