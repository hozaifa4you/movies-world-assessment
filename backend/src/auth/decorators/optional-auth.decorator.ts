import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import jwt from 'jsonwebtoken';

export const OptionalAuth = createParamDecorator(
   (data: unknown, ctx: ExecutionContext): number | null => {
      const request = ctx.switchToHttp().getRequest<Request>();
      const token = request.headers['authorization']?.split(' ')[1];

      if (!token) {
         return null;
      }

      const decoded = jwt.decode(token);

      return decoded?.sub as unknown as number;
   },
);
