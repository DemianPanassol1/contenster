import { Expose, Type } from 'class-transformer';

import { Translation } from 'src/shared/dtos/translate.res.dto';

export class GetEmailSettingResDto {
  @Expose()
  id: number;

  @Expose()
  establishmentId: number;

  @Expose()
  purpose: string;

  @Expose()
  server: string;

  @Expose()
  username: string;

  @Expose()
  password: string;

  @Expose()
  port: number;

  @Expose()
  tls: boolean;

  @Expose()
  ssl: boolean;

  @Expose()
  sender: string;

  @Expose()
  recipient: string;

  @Expose()
  recipientCopy: string;

  @Expose()
  @Type(() => Translation)
  titles: Translation[];

  @Expose()
  @Type(() => Translation)
  footers: Translation[];

  @Expose()
  @Type(() => Translation)
  subjects: Translation[];

  @Expose()
  @Type(() => Translation)
  contents: Translation[];
}
