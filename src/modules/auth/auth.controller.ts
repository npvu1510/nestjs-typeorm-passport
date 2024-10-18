import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfigEnvironmentBaseService } from 'src/base/config/config-environent.base.service';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDto } from './dtos/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('config')
  getConfig() {
    return ConfigEnvironmentBaseService.getIns();
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  login() {
    return 'login';
  }
}
