import { Expose, Type } from 'class-transformer';

export class LanguageDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  purpose: string;

  @Expose()
  code: string;

  @Expose()
  icon: string;

  @Expose()
  default: boolean;
}

export class GetConfigInfoResDto {
  @Expose()
  id: number;

  @Expose()
  projectName: string;
  
  @Expose()
  favicon: string;

  @Expose()
  loginLogo: string;

  @Expose()
  loginBanner: string;

  @Expose()
  @Type(() => LanguageDto)
  languages: LanguageDto[];
}
