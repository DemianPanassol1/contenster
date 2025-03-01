import { Expose, Type } from 'class-transformer';

import { Translation } from 'src/shared/dtos/translate.res.dto';

export class GetModuleResDto {
  @Expose()
  id: number;

  @Expose()
  position: number;

  @Expose()
  establishmentId: number;

  @Expose()
  @Type(() => Translation)
  titles: Translation[];

  @Expose()
  @Type(() => Translation)
  descriptions: Translation[];
}
