import {
  UseGuards,
  Injectable,
  HttpStatus,
  CanActivate,
  HttpException,
  ExecutionContext,
} from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { I18nContext } from 'nestjs-i18n';

import settings from 'src/settings';

export function Authorize() {
  return UseGuards(AuthorizeGuard);
}

@Injectable()
export class AuthorizeGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const i18n = I18nContext.current();
    const req: Request = context.switchToHttp().getRequest();

    let token = req.get('Authorization');

    if (!token) {
      throw new HttpException(i18n.t('errors.missingAuthorizationToken'), HttpStatus.UNAUTHORIZED);
    }

    token = token.split(' ').pop();

    if (!token) {
      throw new HttpException(i18n.t('errors.missingAuthorizationToken'), HttpStatus.UNAUTHORIZED);
    }

    try {
      jwt.verify(token, settings.JWT_TOKEN);
    } catch {
      throw new HttpException(i18n.t('errors.invalidAuthorizationToken'), HttpStatus.UNAUTHORIZED);
    }

    return true;
  }
}
