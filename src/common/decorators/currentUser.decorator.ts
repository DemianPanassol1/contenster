import { Request } from 'express';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator((data: never, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest<Request>();

  return req.session.user;
});
