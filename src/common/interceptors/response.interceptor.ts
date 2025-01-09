import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Observable, of } from 'rxjs';
import { existsSync, unlinkSync } from 'fs';
import { Request, Response } from 'express';
import { catchError, map } from 'rxjs/operators';
import { I18nContext, I18nService } from 'nestjs-i18n';

import { CoreInterceptor } from 'src/core/core.interceptor';
import { miliToString } from 'src/shared/utils/convertion.utils';
import { ErrorItem, ResponseFormat } from 'src/shared/types/api.types';

@Injectable()
export class ResponseInterceptor extends CoreInterceptor implements NestInterceptor {
  constructor(
    private readonly logger: Logger,
    private readonly i18n: I18nService,
  ) {
    super();
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseFormat<any>> {
    const req: Request = context.switchToHttp().getRequest<Request>();
    const res: Response = context.switchToHttp().getResponse<Response>();

    const now = Date.now();

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
        console.log(JSON.stringify(err));

        this.logger.error(err.message, err.stack);

        const statusCode = err.getStatus ? err.getStatus() : 500;
        const statusDescription = HttpStatus[statusCode] || 'UNKNOWN_STATUS';

        const errors: ErrorItem[] = [];
        const regex = /^(?=.*\.)[a-z.]+$/;

        if (err.name === 'HttpException') {
          errors.push({
            id: uuidv4(),
            message: regex.test(err.message) ? this.i18n.t(err.message) : err.message,
            errorType: err.name,
          });
        } else if (err.name === 'I18nValidationException') {
          this.processValidationErrors(err.errors, errors, err.name);
        } else {
          errors.push({
            id: uuidv4(),
            message: this.i18n.t('errors.genericError'),
            errorType: err.name,
          });
        }

        const errorResponse: ResponseFormat<null> = {
          lang: I18nContext.current().lang,
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

  private processValidationErrors(errorList: any[], errors: ErrorItem[], errorType: string) {
    for (const error of errorList) {
      if (error.children && error.children.length > 0) {
        // Chama recursivamente para processar filhos
        this.processValidationErrors(error.children, errors, errorType);
      } else if (error.constraints) {
        // Processa constraints, traduzindo as mensagens
        for (const constraintKey in error.constraints) {
          errors.push({
            id: uuidv4(),
            message: this.i18n.t(error.constraints[constraintKey], {
              args: {
                property: error.property,
                value: error.value,
              },
            }),
            errorType,
          });
        }
      }
    }
  }
}
