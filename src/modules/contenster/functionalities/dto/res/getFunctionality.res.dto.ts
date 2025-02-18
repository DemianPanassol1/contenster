import { Expose, Type } from 'class-transformer';

import { Translation } from 'src/shared/dtos/translate.res.dto';

class Module {
  @Expose()
  id: number;
}

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
  @Type(() => Module)
  module: Module;

  @Expose()
  @Type(() => Translation)
  titles: Translation[];
}
