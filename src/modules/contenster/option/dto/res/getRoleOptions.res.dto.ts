import { Expose, Type } from 'class-transformer';

import { Meta } from 'src/shared/dtos/paginate.res.dto';

class GetRoleOptionsData {
  @Expose()
  value: string;

  @Expose()
  label: string;
}

class CustomMeta extends Meta {
  @Expose()
  establishmentId: number;
}

export class GetRoleOptionsResDto {
  @Expose()
  @Type(() => GetRoleOptionsData)
  data: GetRoleOptionsData[];

  @Expose()
  @Type(() => CustomMeta)
  meta: CustomMeta;
}
