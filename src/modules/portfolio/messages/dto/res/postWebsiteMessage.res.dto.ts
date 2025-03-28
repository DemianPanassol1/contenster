import { Expose } from 'class-transformer';

export class PostWebsiteMessageResDto {
  @Expose()
  sended: boolean;
}
