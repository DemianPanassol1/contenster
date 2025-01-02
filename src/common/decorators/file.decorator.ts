import { Request } from 'express';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const File = createParamDecorator((_: never, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest<Request>();

  return req.file;
});
