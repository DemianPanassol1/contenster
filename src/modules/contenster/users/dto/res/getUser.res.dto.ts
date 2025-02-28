import { Expose, Type } from 'class-transformer';

class Role {
  @Expose()
  id: number;

  @Expose()
  title: string;
}

class Establishment {
  @Expose()
  id: number;

  @Expose()
  corporateName: string;
}
class UserEstablishmentRole {
  @Expose()
  id: number;

  @Expose()
  @Type(() => Establishment)
  establishment: Establishment;

  @Expose()
  @Type(() => Role)
  role: Role;
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
  @Type(() => UserEstablishmentRole)
  userEstablishmentRole: UserEstablishmentRole;

  @Expose()
  establishmentId: number;

  @Expose()
  roleId: number;

  @Expose()
  imageId: number;

  @Expose()
  preferenceId: number;
}
