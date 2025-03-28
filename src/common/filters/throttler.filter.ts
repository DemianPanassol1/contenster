import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { I18nContext } from 'nestjs-i18n';
import { ThrottlerException } from '@nestjs/throttler';
import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';

import { miliToString } from 'src/shared/utils/convertion.utils';

@Catch(ThrottlerException)
export class ThrottlerExceptionFilter implements ExceptionFilter {
  catch(exception: ThrottlerException, host: ArgumentsHost) {
    const now = Date.now();
    const i18n = I18nContext.current();

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const statusCode = HttpStatus.TOO_MANY_REQUESTS;
    const statusDescription = HttpStatus[statusCode];

    return response.status(statusCode).json({
      lang: I18nContext.current().lang,
      requestId: uuidv4(),
      statusCode: statusCode,
      status: statusDescription,
      body: null,
      errors: {
        count: 1,
        items: [
          {
            id: uuidv4(),
            errorType: exception.name,
            message: i18n.t('errors.throttlerLimitExceeded'),
          },
        ],
      },
      datetime: new Date().toISOString(),
      requestTime: miliToString(Date.now() - now),
    });
  }
}
