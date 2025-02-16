import { Expose, Type } from 'class-transformer';

import { Meta } from 'src/shared/dtos/paginate.res.dto';

class GetRolesListData {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  establishment: string;
}

class CustomMeta extends Meta {
  @Expose()
  establishmentId: number;

  @Expose()
  permissionType: string;
}

export class GetRolesListResDto {
  @Expose()
  @Type(() => GetRolesListData)
  data: GetRolesListData[];

  @Expose()
  @Type(() => CustomMeta)
  meta: CustomMeta;
}
