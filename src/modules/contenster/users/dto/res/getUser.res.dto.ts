import { Expose, Type } from 'class-transformer';

class Image {
  @Expose()
  id: number;
}

class Preference {
  @Expose()
  id: number;
}

class Role {
  @Expose()
  id: number;
}

export class GetUserResDto {
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
  isActive: boolean;

  @Expose()
  isBlocked: boolean;

  @Expose()
  @Type(() => Image)
  image: Image;

  @Expose()
  @Type(() => Preference)
  preference: Preference;

  @Expose()
  @Type(() => Role)
  role: Role;
}
