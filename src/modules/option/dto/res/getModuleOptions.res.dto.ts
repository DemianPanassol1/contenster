import { Expose, Type } from 'class-transformer';

import { Meta } from 'src/shared/dtos/paginate.res.dto';

class GetModuleData {
  @Expose()
  value: string;

  @Expose()
  label: string;
}

class CustomMeta extends Meta {
  @Expose()
  establishmentId: number | null;
}

export class GetModuleOptionsResDto {
  @Expose()
  @Type(() => GetModuleData)
  data: GetModuleData[];

  @Expose()
  @Type(() => CustomMeta)
  meta: CustomMeta;
}
