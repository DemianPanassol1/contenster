import { Expose, Type } from 'class-transformer';

import { Meta } from 'src/shared/dtos/paginate.res.dto';

class GetPermissionByFunctionalityOptionsData {
  @Expose()
  value: string;

  @Expose()
  label: string;
}

class CustomMeta extends Meta {
  @Expose()
  establishmentId: number | null;
}

export class GetPermissionByFunctionalityOptionsResDto {
  @Expose()
  @Type(() => GetPermissionByFunctionalityOptionsData)
  data: GetPermissionByFunctionalityOptionsData[];

  @Expose()
  @Type(() => CustomMeta)
  meta: CustomMeta;
}
