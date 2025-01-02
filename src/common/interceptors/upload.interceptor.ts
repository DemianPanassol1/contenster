import {
  CallHandler,
  NestInterceptor,
  UseInterceptors,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { FileInterceptor } from '@nestjs/platform-express';

import { CoreInterceptor } from 'src/core/core.interceptor';
import multerInstance from 'src/config/multer/multer.config';

export function UploadFile() {
  return UseInterceptors(UploadInterceptor);
}

@Injectable()
export class UploadInterceptor extends CoreInterceptor implements NestInterceptor {
  constructor(private readonly i18n: I18nService) {
    super();
  }

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const fileUpload = new (FileInterceptor('file', multerInstance(this.i18n)))();

    await fileUpload.intercept(context, next);

    return next.handle();
  }
}
