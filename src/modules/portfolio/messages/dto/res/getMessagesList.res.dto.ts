import { Expose, Type } from 'class-transformer';

import { Meta } from 'src/shared/dtos/paginate.res.dto';

class GetMessagesListData {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Expose()
  subject: string;

  @Expose()
  content: string;

  @Expose()
  read: boolean;
}

class CustomMeta extends Meta {}

export class GetMessagesListResDto {
  @Expose()
  @Type(() => GetMessagesListData)
  data: GetMessagesListData[];

  @Expose()
  @Type(() => CustomMeta)
  meta: CustomMeta;
}
