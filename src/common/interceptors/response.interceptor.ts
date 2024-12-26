import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { I18nContext, I18nService } from 'nestjs-i18n';

import { CoreInterceptor } from 'src/core/core.interceptor';
import { miliToString } from 'src/shared/utils/convertion.utils';
import { ErrorItem, ResponseFormat } from 'src/shared/types/api.types';

@Injectable()
export class ResponseInterceptor extends CoreInterceptor implements NestInterceptor {
  constructor(private readonly i18n: I18nService) {
    super();
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseFormat<any>> {
    const res: Response = context.switchToHttp().getResponse<Response>();

    const now = Date.now();

    return next.handle().pipe(
      map((data: any) => ({
        lang: I18nContext.current().lang,
        version: '1.0',
        requestId: uuidv4(),
        statusCode: res.statusCode,
        status: HttpStatus[res.statusCode] || 'UNKNOWN_STATUS',
        body: data || null,
        errors: { count: 0, items: [] },
        datetime: new Date().toISOString(),
        requestTime: miliToString(Date.now() - now),
      })),
      catchError((err) => {
        const errors: ErrorItem[] = [];

        const statusCode: number = err.getStatus ? err.getStatus() : 500;
        const statusDescription: string = HttpStatus[statusCode] || 'UNKNOWN_STATUS';

        console.log(err.errors);

        if (Array.isArray(err?.errors)) {
          for (const elem of err.errors) {
            errors.push({
              id: uuidv4(),
              message: this.i18n.t(elem.constraints[Object.keys(elem.constraints)[0]], {
                lang: I18nContext.current().lang,
                args: { property: elem.property, value: elem.value },
              }),
              status: 'ValidationError',
              datetime: new Date().toISOString(),
            });
          }
        } else {
          errors.push({
            id: uuidv4(),
            message: err.message || 'Unknown error',
            status: statusDescription,
            datetime: new Date().toISOString(),
          });
        }

        const errorResponse: ResponseFormat<null> = {
          version: '1.0',
          // lang: I18nContext.current().lang,
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
