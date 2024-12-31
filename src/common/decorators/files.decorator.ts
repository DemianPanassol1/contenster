import { Response } from 'express';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const Files = createParamDecorator((data: never, context: ExecutionContext) => {
  const res = context.switchToHttp().getResponse<Response>();

  return res.locals.files;
});
