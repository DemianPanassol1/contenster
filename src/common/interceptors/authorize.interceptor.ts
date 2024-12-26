import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { I18nContext } from 'nestjs-i18n';

import settings from 'src/settings';
import { CoreInterceptor } from 'src/core/core.interceptor';

export function Authorize() {
  return UseInterceptors(new AuthorizeInterceptor());
}

@Injectable()
export class AuthorizeInterceptor extends CoreInterceptor implements NestInterceptor {
  constructor() {
    super();
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req: Request = context.switchToHttp().getRequest<Request>();

    const i18n = I18nContext.current();

    let token = req.get('Authorization');

    if (!token) {
      throw new HttpException(i18n.t('errors.missingAuthorizationToken'), HttpStatus.BAD_REQUEST);
    }

    token = token.split(' ').pop();

    if (!token) {
      throw new HttpException(i18n.t('errors.missingAuthorizationToken'), HttpStatus.BAD_REQUEST);
    }

    jwt.verify(token, settings.JWT_TOKEN, (err: string | object) => {
      if (err) {
        throw new HttpException(i18n.t('errors.invalidAuthorizationToken'), HttpStatus.BAD_REQUEST);
      }
    });

    return next.handle();
  }
}
