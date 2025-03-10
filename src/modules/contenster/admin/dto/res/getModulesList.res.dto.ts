import { Expose, Type } from 'class-transformer';

export class PermissionDto {
  @Expose()
  id: number;

  @Expose()
  canRead: boolean;

  @Expose()
  canCreate: boolean;

  @Expose()
  canUpdate: boolean;

  @Expose()
  canDelete: boolean;

  @Expose()
  type: string;
}

export class FunctionalityDto {
  @Expose()
  id: number;

  @Expose()
  slug: string;

  @Expose()
  title: string;

  @Expose()
  icon: string | null;

  @Expose()
  position: number;

  @Expose()
  moduleId: number;

  @Expose()
  @Type(() => PermissionDto)
  permissions: PermissionDto;
}

export class GetModulesListResDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  // @Expose()
  // description: string;

  @Expose()
  position: number;

  @Expose()
  @Type(() => FunctionalityDto)
  functionalities: FunctionalityDto[];
}
