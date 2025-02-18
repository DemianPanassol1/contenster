import { Expose, Type } from 'class-transformer';

class Functionality {
  @Expose()
  id: number;
}

class Role {
  @Expose()
  id: number;
}

export class GetPermissionResDto {
  @Expose()
  id: number;

  @Expose()
  @Type(() => Functionality)
  functionality: Functionality;

  @Expose()
  @Type(() => Role)
  role: Role;

  @Expose()
  canCreate: boolean;

  @Expose()
  canRead: boolean;

  @Expose()
  canUpdate: boolean;

  @Expose()
  canDelete: boolean;

  @Expose()
  permissionType: string;
}
