import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  Req,
  UseGuards,
  HttpCode,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigEnvironmentBaseService } from 'src/base/config/config-environent.base.service';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDto } from './dtos/register.dto';

import { CurrentUser } from './decorators/current-user.decorator';
import { Request } from 'express';
import { LocalAuthGuard } from './guards/local.guard';
import { JwtTokenPayload } from './interfaces/jwt-token-payload.interface';
import { setJwtCookies } from './interceptors/set-jwt-cookies.interceptor';
import { User } from 'src/repositories/entities/User.entity';

import * as lodash from 'lodash';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('config')
  getConfig() {
    return ConfigEnvironmentBaseService.getIns();
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(setJwtCookies)
  async register(@Body() registerDto: RegisterDto) {
    const { user, tokens } = await this.authService.register(registerDto);

    return {
      status: 'success',
      data: {
        user,
        tokens,
      },
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(setJwtCookies)
  async login(@CurrentUser() user: Partial<User>) {
    const jwtTokenPayLoad: JwtTokenPayload = {
      sub: user.id,
      email: user.email,
    };
    const { tokens } = await this.authService.login(jwtTokenPayLoad);
    return {
      status: 'success',
      data: {
        user: lodash.pick(user, ['id', 'email', 'role']),
        tokens,
      },
    };
  }

  @Get('refresh-token')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  refreshToken(@CurrentUser() user: Partial<User>) {
    return this.login(user);
  }
}
