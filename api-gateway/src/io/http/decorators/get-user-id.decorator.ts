import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUserId = createParamDecorator((data, exc: ExecutionContext) => {
  const request = exc.switchToHttp().getRequest();
  return request['userId'];
});
