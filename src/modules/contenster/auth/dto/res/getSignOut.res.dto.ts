import { Expose } from 'class-transformer';

export class GetSignOutResDto {
  @Expose()
  logout: boolean;
}
