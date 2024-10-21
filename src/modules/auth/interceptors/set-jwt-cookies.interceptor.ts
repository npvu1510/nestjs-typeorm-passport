import {
  CallHandler,
  ExecutionContext,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';

import { Observable, tap } from 'rxjs';
import { setCookies } from 'src/utils/helpers/set-jwt-cookies';

export class setJwtCookies implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const res: Response = context.switchToHttp().getResponse();
    return next.handle().pipe(
      tap((data) => {
        if (!data) throw new InternalServerErrorException('Tokens not found');

        const { tokens } = data.data;
        setCookies(res, tokens);
      }),
    );
  }
}
