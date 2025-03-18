import { Expose, Type } from 'class-transformer';

import { Meta } from 'src/shared/dtos/paginate.res.dto';

class GetEmailSettingListData {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  establishment: string;

  @Expose()
  purpose: string;
}

class CustomMeta extends Meta {
  @Expose()
  establishmentId: number;

  @Expose()
  permissionType: string;
}

export class GetEmailSettingListResDto {
  @Expose()
  @Type(() => GetEmailSettingListData)
  data: GetEmailSettingListData[];

  @Expose()
  @Type(() => CustomMeta)
  meta: CustomMeta;
}
