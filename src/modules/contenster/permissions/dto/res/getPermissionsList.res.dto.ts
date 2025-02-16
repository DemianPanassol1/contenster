import { Expose, Type } from 'class-transformer';

import { Meta } from 'src/shared/dtos/paginate.res.dto';

class GetPermissionsListData {
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
  permissionType: string;

  @Expose()
  role: string;

  @Expose()
  functionality: string;

  @Expose()
  establishment: string;
}

class CustomMeta extends Meta {
  @Expose()
  establishmentId: number;

  @Expose()
  permissionType: string;
}

export class GetPermissionsListResDto {
  @Expose()
  @Type(() => GetPermissionsListData)
  data: GetPermissionsListData[];

  @Expose()
  @Type(() => CustomMeta)
  meta: CustomMeta;
}
