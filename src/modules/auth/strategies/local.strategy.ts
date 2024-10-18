import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as Local } from 'passport-local';
import { AuthService } from '../auth.service';
import { Request } from 'express';

@Injectable()
export class LocalStrategy extends PassportStrategy(Local) {
  constructor(private readonly authService: AuthService) {
    super({});
  }

  authenticate(req: Request, options?: any): void {}
}
