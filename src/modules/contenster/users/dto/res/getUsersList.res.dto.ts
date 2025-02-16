import { Expose, Type } from 'class-transformer';

import { Meta } from 'src/shared/dtos/paginate.res.dto';

class GetUsersListData {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  username: string;

  @Expose()
  image: string;

  @Expose()
  isActive: boolean;

  @Expose()
  isBlocked: boolean;

  @Expose()
  lastLoggedAt: Date;
}

class CustomMeta extends Meta {
  @Expose()
  establishmentId: number;

  @Expose()
  permissionType: string;
}

export class GetUsersListResDto {
  @Expose()
  @Type(() => GetUsersListData)
  data: GetUsersListData[];

  @Expose()
  @Type(() => CustomMeta)
  meta: CustomMeta;
}
