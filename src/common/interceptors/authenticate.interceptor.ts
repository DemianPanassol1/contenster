import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Request } from 'express';
import { I18nContext } from 'nestjs-i18n';

import { CoreInterceptor } from 'src/core/core.interceptor';
import { environment } from 'src/config/constants/constants.config';

export function Authenticate() {
  return UseInterceptors(AuthenticateInterceptor);
}

@Injectable()
export class AuthenticateInterceptor extends CoreInterceptor implements NestInterceptor {
  constructor() {
    super();
  }

  intercept(context: ExecutionContext, next: CallHandler) {
    const req: Request = context.switchToHttp().getRequest<Request>();

    const i18n = I18nContext.current();

    if (!req.session || !req.session?.user) {
      try {
        const session = JSON.parse(req.get('Session'));

        if (!session || environment !== 'development') throw Error();

        req.session.user = session;

        // eslint-disable-next-line
      } catch (error) {
        throw new HttpException(i18n.t('errors.accessDenied'), HttpStatus.UNAUTHORIZED);
      }
    }

    return next.handle();
  }
}
