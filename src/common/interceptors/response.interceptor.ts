import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';
import { Observable, of } from 'rxjs';
import { I18nContext } from 'nestjs-i18n';
import { existsSync, unlinkSync } from 'fs';
import { Request, Response } from 'express';
import { catchError, map } from 'rxjs/operators';

import { CoreInterceptor } from 'src/core/core.interceptor';
import { miliToString } from 'src/shared/utils/convertion.utils';
import { ErrorItem, ResponseFormat } from 'src/shared/types/api.types';

@Injectable()
export class ResponseInterceptor extends CoreInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {
    super();
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseFormat<any>> {
    const req: Request = context.switchToHttp().getRequest<Request>();
    const res: Response = context.switchToHttp().getResponse<Response>();

    const now = Date.now();

    const i18n = I18nContext.current();

    return next.handle().pipe(
      map((data: any) => {
        const statusCode = res.statusCode === HttpStatus.CREATED ? HttpStatus.OK : res.statusCode;
        const statusDescription = HttpStatus[statusCode] || 'UNKNOWN_STATUS';

        const response: ResponseFormat<any> = {
          lang: I18nContext.current().lang,
          requestId: uuidv4(),
          statusCode: statusCode,
          status: statusDescription,
          body: data || null,
          errors: { count: 0, items: [] },
          datetime: new Date().toISOString(),
          requestTime: miliToString(Date.now() - now),
        };

        return response;
      }),

      catchError((err) => {
        if (req.file) {
          if (existsSync(req.file.path)) {
            unlinkSync(req.file.path);
          }

          req.file = null;
        }

        this.logger.error(err.message, err.stack);

        const statusCode = err.getStatus ? err.getStatus() : 500;
        const statusDescription = HttpStatus[statusCode] || 'UNKNOWN_STATUS';

        const errors: ErrorItem[] = [];

        if (Array.isArray(err?.errors)) {
          for (const elem of err.errors) {
            errors.push({
              id: uuidv4(),
              message: i18n.t(elem.constraints[Object.keys(elem.constraints)[0]], {
                args: { property: elem.property, value: elem.value, constraints: elem.constraints },
              }),
              errorType: 'ValidationError',
            });
          }
        } else {
          errors.push({
            id: uuidv4(),
            message: err.message || i18n.t('errors.genericError'),
            errorType: statusDescription,
          });
        }

        const errorResponse: ResponseFormat<null> = {
          lang: i18n.lang,
          requestId: uuidv4(),
          statusCode: statusCode,
          status: statusDescription,
          body: null,
          errors: {
            count: errors.length,
            items: errors,
          },
          datetime: new Date().toISOString(),
          requestTime: miliToString(Date.now() - now),
        };

        return of(errorResponse);
      }),
    );
  }
}
