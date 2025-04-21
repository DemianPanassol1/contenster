import {
  UseGuards,
  Injectable,
  HttpStatus,
  CanActivate,
  HttpException,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';
import { I18nContext } from 'nestjs-i18n';

import { environment } from 'src/config/constants/constants.config';

export function Authenticate() {
  return UseGuards(AuthenticateGuard);
}

@Injectable()
export class AuthenticateGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const i18n = I18nContext.current();
    const req: Request = context.switchToHttp().getRequest();

    if (!req.session || !req.session.user) {
      try {
        if (environment !== 'development') throw new Error();

        const sessionHeader = req.get('Session');

        if (!sessionHeader) throw new Error();

        const session = JSON.parse(sessionHeader);

        if (!session) throw new Error();

        req.session.user = session;
      } catch {
        throw new HttpException(i18n.t('errors.userMustBeLogged'), HttpStatus.FORBIDDEN);
      }
    }

    return true;
  }
}
