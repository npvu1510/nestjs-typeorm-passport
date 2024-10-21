import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy as JWT, ExtractJwt } from 'passport-jwt';
import { JwtTokenPayload } from '../interfaces/jwt-token-payload.interface';
import { UsersService } from 'src/modules/users/users.service';

function extractJwtFromCookie(req: Request) {
  console.log(req.cookies['access_token']);
  return req.cookies['access_token'];
}

@Injectable()
export class JwtStrategy extends PassportStrategy(JWT) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([extractJwtFromCookie]),
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtTokenPayload) {
    const user = await this.userService.findOne({ where: { id: payload.sub } });

    return user;
  }
}
