import {
  Logger,
  HttpStatus,
  Injectable,
  CallHandler,
  HttpException,
  NestInterceptor,
  ExecutionContext,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { unlink } from 'fs/promises';
import { Observable, of } from 'rxjs';
import { Request, Response } from 'express';
import { catchError, map } from 'rxjs/operators';
import { ValidationError } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityPropertyNotFoundError, Repository } from 'typeorm';
import { I18nContext, I18nValidationException } from 'nestjs-i18n';

import { regex } from 'src/shared/utils/regex.utils';
import { miliToString } from 'src/shared/utils/convertion.utils';
import { environment } from 'src/config/constants/constants.config';
import { ErrorItem, ResponseFormat } from 'src/shared/types/api.types';
import { LoglevelType, RequestLog } from 'src/entities/contensterdb/requestLog.entity';

type ErrorType = HttpException | I18nValidationException | EntityPropertyNotFoundError;

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(RequestLog, 'contensterdb') private repo: Repository<RequestLog>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const i18n: I18nContext = I18nContext.current();

    const req: Request = context.switchToHttp().getRequest<Request>();
    const res: Response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((data: unknown) => {
        const statusCode = res.statusCode === HttpStatus.CREATED ? HttpStatus.OK : res.statusCode;

        res.status(statusCode);

        const response = this.buildResponse(req, res, data);

        this.logRequest(req, res, LoglevelType.info, response);

        return response;
      }),
      catchError((error) => {
        const statusCode = error.getStatus ? error.getStatus() : 500;

        if (req.file) {
          unlink(req.file.path).catch(() => null);

          req.file = null;
        }

        res.status(statusCode);

        const response = this.buildErrorResponse(error, req, res, i18n);

        this.logger.error(error.message, error.stack);

        if (statusCode >= 500) {
          this.logRequest(req, res, LoglevelType.error, response);
        } else {
          this.logRequest(req, res, LoglevelType.warning, response);
        }

        return of(response);
      }),
    );
  }

  private buildResponse(req: Request, res: Response, data: unknown): ResponseFormat<unknown> {
    return {
      lang: I18nContext.current().lang,
      requestId: uuidv4(),
      statusCode: res.statusCode,
      status: HttpStatus[res.statusCode] || 'UNKNOWN_STATUS',
      body: data,
      errors: { count: 0, items: [] },
      datetime: new Date().toISOString(),
      requestTime: miliToString(Date.now() - req.startTime),
    };
  }

  private buildErrorResponse(error: ErrorType, req: Request, res: Response, i18n: I18nContext) {
    const errors: ErrorItem[] = [];

    if (error instanceof I18nValidationException) {
      this.processValidationErrors(error.errors, errors, i18n);
    } else if (error instanceof HttpException) {
      errors.push({
        id: uuidv4(),
        message: regex.test(error.message) ? i18n.t(error.message) : error.message,
        errorType: error.name,
      });
    } else if (error instanceof EntityPropertyNotFoundError && environment !== 'production') {
      errors.push({
        id: uuidv4(),
        message: error.message,
        errorType: error.name,
      });
    } else {
      errors.push({
        id: uuidv4(),
        message: i18n.t('errors.genericError'),
        errorType: 'UNKNOWN_ERROR',
      });
    }

    return {
      lang: I18nContext.current().lang,
      requestId: uuidv4(),
      statusCode: res.statusCode,
      status: HttpStatus[res.statusCode] || 'UNKNOWN_STATUS',
      body: null,
      errors: {
        count: errors.length,
        items: errors,
      },
      datetime: new Date().toISOString(),
      requestTime: miliToString(Date.now() - req.startTime),
    };
  }

  private logRequest(
    req: Request,
    res: Response,
    level: LoglevelType,
    response: ResponseFormat<unknown>,
  ): void {
    try {
      const requestLog: Partial<RequestLog> = {
        logLevel: level,
        ipAddress: req.ip,
        responseBody: response,
        requestId: uuidv4(),
        requestBody: req.body,
        httpMethod: req.method,
        requestHeader: req.headers as Record<string, string | string[]>,
        responseStatusCode: res.statusCode,
        userAgent: req.headers['user-agent'],
        responseTime: miliToString(Date.now() - req.startTime),
      };

      this.repo.save(requestLog);
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(error.message, error.stack);
      }
    }
  }

  private processValidationErrors(
    errorList: ValidationError[],
    errors: ErrorItem[],
    i18n: I18nContext,
  ) {
    for (const error of errorList) {
      if (error.children && error.children.length > 0) {
        this.processValidationErrors(error.children, errors, i18n);
      } else if (error.constraints) {
        for (const constraintKey in error.constraints) {
          errors.push({
            id: uuidv4(),
            message: i18n.t(error.constraints[constraintKey], {
              args: {
                property: error.property,
                value: error.value,
              },
            }),
            errorType: 'I18nValidationException',
          });
        }
      }
    }
  }
}
