import { Expose, Type } from 'class-transformer';

import { Meta } from 'src/shared/dtos/paginate.res.dto';

class GetFunctionalitiesListData {
  @Expose()
  id: number;

  @Expose()
  slug: string;

  @Expose()
  title: string;

  @Expose()
  position: number;

  @Expose()
  icon: string;

  @Expose()
  establishment: string;
}

class CustomMeta extends Meta {
  @Expose()
  establishmentId: number;

  @Expose()
  permissionType: string;
}

export class GetFunctionalitiesListResDto {
  @Expose()
  @Type(() => GetFunctionalitiesListData)
  data: GetFunctionalitiesListData[];

  @Expose()
  @Type(() => CustomMeta)
  meta: CustomMeta;
}
