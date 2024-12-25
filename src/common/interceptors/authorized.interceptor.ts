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

    let token = req.get('Authorization');

    if (!token) {
      throw new HttpException('Unauthorized Message', HttpStatus.BAD_REQUEST);
    }

    token = token.split(' ').pop();

    if (!token) {
      throw new HttpException('Unauthorized Message', HttpStatus.BAD_REQUEST);
    }

    jwt.verify(token, settings.JWT_TOKEN, (err: string | object) => {
      if (err) {
        throw new HttpException('Token de autorização inválido', HttpStatus.BAD_REQUEST);
      }
    });

    return next.handle();
  }
}
