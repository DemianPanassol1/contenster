import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

import { CoreInterceptor } from 'src/core/core.interceptor';
import { miliToString } from 'src/shared/utils/convertion.utils';

@Injectable()
export class ResponseInterceptor extends CoreInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const res: Response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((data) => ({
        version: '1.0',
        requestId: uuidv4(),
        status_code: res.statusCode,
        status: 'success',
        body: data || null,
        errors: { count: 0, items: [] },
        datetime: new Date().toISOString(),
        requestTime: miliToString(Date.now() - now),
      })),

      catchError((err) => {
        const statusCode = err.getStatus ? err.getStatus() : 500;

        const validationErrors = Array.isArray(err.response?.message)
          ? err.response.message.map((validationError) => ({
              id: uuidv4(),
              code: 1000, // Código específico para erros de validação
              status_code: statusCode,
              status: 'validation_error',
              message: Object.values(validationError.constraints || {}).join('; '),
              field: validationError.property,
              datetime: new Date().toISOString(),
            }))
          : [
              {
                id: uuidv4(),
                code: err.code || 0,
                status_code: statusCode,
                status: err.status || 'error',
                message: err.message || 'Unexpected error occurred.',
                datetime: new Date().toISOString(),
              },
            ];

        return throwError(() => ({
          version: '1.0',
          requestId: uuidv4(),
          status_code: statusCode,
          status: 'error',
          body: null,
          errors: {
            count: validationErrors.length,
            items: validationErrors,
          },
          datetime: new Date().toISOString(),
          requestTime: miliToString(Date.now() - now),
        }));
      }),
    );
  }
}
