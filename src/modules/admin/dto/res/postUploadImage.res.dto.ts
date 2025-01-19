import { Expose, Transform } from 'class-transformer';

import { bytesToString } from 'src/shared/utils/convertion.utils';

export class PostUploadImageResDto {
  @Expose()
  id: number;

  @Expose()
  @Transform(({ value }) => bytesToString(value))
  size: string;

  @Expose()
  @Transform(({ value }) => (value ? `${value}px` : value))
  width: string;

  @Expose()
  @Transform(({ value }) => (value ? `${value}px` : value))
  height: string;

  @Expose()
  newName: string;

  @Expose()
  mimeType: string;

  @Expose()
  originalName: string;

  @Expose()
  filePath: string;
}
