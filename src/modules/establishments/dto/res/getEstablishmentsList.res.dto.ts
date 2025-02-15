import { Expose, Type } from 'class-transformer';

import { Meta } from 'src/shared/dtos/paginate.res.dto';

class GetEstablishmentsListData {
  @Expose()
  id: number;

  @Expose()
  document: string;

  @Expose()
  documentType: string;

  @Expose()
  fantasyName: string;

  @Expose()
  corporateName: string;
}

class CustomMeta extends Meta {}

export class GetEstablishmentsListResDto {
  @Expose()
  @Type(() => GetEstablishmentsListData)
  data: GetEstablishmentsListData[];

  @Expose()
  @Type(() => CustomMeta)
  meta: CustomMeta;
}
