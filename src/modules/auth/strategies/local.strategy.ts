import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as Local } from 'passport-local';
import { AuthService } from '../auth.service';
import { Request } from 'express';

@Injectable()
export class LocalStrategy extends PassportStrategy(Local) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email', // hoặc email nếu bạn dùng email
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    const foundUser = await this.authService.verifyUser(email, password);

    if (!foundUser) throw new UnauthorizedException();

    return foundUser;
  }
}
