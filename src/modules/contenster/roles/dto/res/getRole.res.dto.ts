import { Expose, Type } from 'class-transformer';

import { Translation } from 'src/shared/dtos/translate.res.dto';

class Establishment {
  @Expose()
  id: number;

  @Expose()
  corporateName: string;
}

export class GetRoleResDto {
  @Expose()
  id: number;

  @Expose()
  @Type(() => Establishment)
  establishment: Establishment;

  @Expose()
  @Type(() => Translation)
  titles: Translation[];

  @Expose()
  @Type(() => Translation)
  descriptions: Translation[];
}
