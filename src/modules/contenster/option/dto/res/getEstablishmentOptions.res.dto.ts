import { Expose, Type } from 'class-transformer';

import { Meta } from 'src/shared/dtos/paginate.res.dto';

class GetEstablishmentOptionsData {
  @Expose()
  value: string;

  @Expose()
  label: string;
}

class CustomMeta extends Meta {}

export class GetEstablishmentOptionsResDto {
  @Expose()
  @Type(() => GetEstablishmentOptionsData)
  data: GetEstablishmentOptionsData[];

  @Expose()
  @Type(() => CustomMeta)
  meta: CustomMeta;
}
