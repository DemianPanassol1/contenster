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
import { map, catchError } from 'rxjs/operators';

import { CoreInterceptor } from 'src/core/core.interceptor';
import { miliToString } from 'src/shared/utils/convertion.utils';
import { ErrorItem, ResponseFormat } from 'src/shared/types/api.types';

@Injectable()
export class ResponseInterceptor extends CoreInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseFormat<any>> {
    const now = Date.now();

    const { statusCode }: Response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((data: any) => ({
        version: '1.0',
        requestId: uuidv4(),
        statusCode: statusCode,
        status: HttpStatus[statusCode] || 'UNKNOWN_STATUS',
        body: data || null,
        errors: { count: 0, items: [] },
        datetime: new Date().toISOString(),
        requestTime: miliToString(Date.now() - now),
      })),
      catchError((err: any) => {
        const errors: ErrorItem[] = [];

        const statusCode: number = err.getStatus ? err.getStatus() : 500;
        const statusDescription: string = HttpStatus[statusCode] || 'UNKNOWN_STATUS';

        if (Array.isArray(err.response?.message)) {
          const array: string[] = err.response.message;

          for (const elem of array) {
            errors.push({
              id: uuidv4(),
              message: elem,
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
