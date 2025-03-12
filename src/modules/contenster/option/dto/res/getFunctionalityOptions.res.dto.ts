import { Expose, Type } from 'class-transformer';

import { Meta } from 'src/shared/dtos/paginate.res.dto';

class GetFunctionalityOptionsData {
  @Expose()
  value: string;

  @Expose()
  label: string;
}

class CustomMeta extends Meta {
  @Expose()
  establishmentId: number;
}

export class GetFunctionalityOptionsResDto {
  @Expose()
  @Type(() => GetFunctionalityOptionsData)
  data: GetFunctionalityOptionsData[];

  @Expose()
  @Type(() => CustomMeta)
  meta: CustomMeta;
}
