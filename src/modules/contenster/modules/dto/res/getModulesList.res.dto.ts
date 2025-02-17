import { Expose, Type } from 'class-transformer';

import { Meta } from 'src/shared/dtos/paginate.res.dto';

class GetModulesListData {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  position: number;

  @Expose()
  establishment: string;
}

class CustomMeta extends Meta {
  @Expose()
  establishmentId: number;

  @Expose()
  permissionType: string;
}

export class GetModulesListResDto {
  @Expose()
  @Type(() => GetModulesListData)
  data: GetModulesListData[];

  @Expose()
  @Type(() => CustomMeta)
  meta: CustomMeta;
}
