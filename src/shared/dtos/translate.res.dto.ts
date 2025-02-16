import { Expose, Type } from 'class-transformer';

export class Language {
  @Expose()
  id: number;

  @Expose()
  languageCode: string;
}

export class Translation {
  @Expose()
  id: number;

  @Expose()
  text: string;

  @Expose()
  @Type(() => Language)
  language: Language;
}
