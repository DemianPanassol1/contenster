import { Expose } from 'class-transformer';

export class GetPermissionResDto {
  @Expose()
  id: number;

  @Expose()
  functionalityId: number;

  @Expose()
  roleId: number;

  @Expose()
  establishmentId: number;

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
