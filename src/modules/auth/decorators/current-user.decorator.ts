import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request } from 'express';

import * as lodash from 'lodash';
import { User } from 'src/repositories/entities/User.entity';

export const CurrentUser = createParamDecorator<
  keyof User | (keyof User)[], // Kiểu dữ liệu cho 'data' là 1 key hoặc 1 mảng các key của User
  ExecutionContext,
  any // Giá trị trả về từ decorator, có thể là bất kỳ
>((data: keyof User | (keyof User)[], ctx: ExecutionContext): Partial<User> => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;

  if (!data) return user;

  return Array.isArray(data) ? lodash.pick(user, data) : { [data]: user[data] };
});
