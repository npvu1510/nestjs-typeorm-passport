import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RepositoryService } from 'src/repositories/repository.service';

import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dtos/register.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtTokenPayload } from './interfaces/jwt-token-payload.interface';
import { ConfigEnvironmentBaseService } from 'src/base/config/config-environent.base.service';

import * as lodash from 'lodash';
import { UsersService } from '../users/users.service';
import { ITokens } from 'src/common/interface/tokens.interface';
import { IsNull } from 'typeorm';
import { randomToken } from 'src/utils/helpers/random-token';

@Injectable()
export class AuthService {
  constructor(
    private readonly model: RepositoryService,
    private readonly userService: UsersService,

    private readonly jwtService: JwtService,
  ) {}

  async verifyUser(email: string, password: string) {
    const foundUser = await this.userService.findOne({
      where: { email },
    });

    if (!foundUser || !(await bcrypt.compare(password, foundUser.password)))
      throw new UnauthorizedException('Invalid email or password');

    return foundUser;
  }

  genToken(
    payload: JwtTokenPayload,
    expiresIn: string | number,
    secretKey: string,
  ) {
    console.log(
      ConfigEnvironmentBaseService.getIns().get<string | number>(
        'JWT_ACCESS_TOKEN_EXPIRES',
      ),
    );
    return this.jwtService.signAsync(payload, { expiresIn, secret: secretKey });
  }

  genAccessAndRefreshToken(payload: JwtTokenPayload) {
    return Promise.all([
      this.genToken(
        payload,
        ConfigEnvironmentBaseService.getIns().get<string | number>(
          'JWT_ACCESS_TOKEN_EXPIRES',
        ),
        ConfigEnvironmentBaseService.getIns().get<string>(
          'JWT_ACCESS_TOKEN_SECRET',
        ),
      ),
      this.genToken(
        payload,
        ConfigEnvironmentBaseService.getIns().get<string | number>(
          'JWT_REFRESH_TOKEN_EXPIRES',
        ),
        ConfigEnvironmentBaseService.getIns().get<string>(
          'JWT_REFRESH_TOKEN_SECRET',
        ),
      ),
    ]);
  }

  async register(registerDto: RegisterDto) {
    if (registerDto.password !== registerDto.confirmPassword)
      throw new BadRequestException('Passwords do not match');

    // hashed password
    registerDto.password = await bcrypt.hash(registerDto.password, 10);

    // create user
    const newUser = await this.userService.create(registerDto);

    // JWT token
    const [accessToken, refreshToken] = await this.genAccessAndRefreshToken({
      sub: newUser.id,
      email: newUser.email,
    });

    console.log(
      ConfigEnvironmentBaseService.getIns().get<string | number>(
        'VERIFY_ACCOUNT_TOKEN_SECRET',
      ),
    );
    // add tokens (hashed refresh token and verify token)
    const verifyAccountToken = await this.jwtService.signAsync(
      {
        sub: newUser.id,
        email: newUser.email,
      },
      {
        expiresIn: ConfigEnvironmentBaseService.getIns().get<number | string>(
          'VERIFY_ACCOUNT_TOKEN_EXPIRES',
        ),
        secret: ConfigEnvironmentBaseService.getIns().get<string>(
          'VERIFY_ACCOUNT_TOKEN_SECRET',
        ),
      },
    );

    this.userService.update(
      { id: newUser.id, refreshToken: IsNull() },
      {
        refreshToken: await bcrypt.hash(refreshToken, 10),
        verifyAccountToken: await bcrypt.hash(verifyAccountToken, 10),
      },
    );

    return {
      user: lodash.pick(newUser, ['email', 'id', 'role']),
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }

  async login(jwtTokenPayload: JwtTokenPayload) {
    // tokens
    const [accessToken, refreshToken] =
      await this.genAccessAndRefreshToken(jwtTokenPayload);

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userService.update(
      { email: jwtTokenPayload.email },
      {
        refreshToken: hashedRefreshToken,
      },
    );

    return { tokens: { accessToken, refreshToken } };
  }
}
