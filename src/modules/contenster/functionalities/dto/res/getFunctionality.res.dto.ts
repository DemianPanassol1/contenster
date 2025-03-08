import { Expose, Type } from 'class-transformer';

import { Translation } from 'src/shared/dtos/translate.res.dto';

export class GetFunctionalityResDto {
  @Expose()
  id: number;

  @Expose()
  position: number;

  @Expose()
  icon: string;

  @Expose()
  slug: string;

  @Expose()
  moduleId: number;

  @Expose()
  establishmentId: number;

  @Expose()
  @Type(() => Translation)
  titles: Translation[];
}
