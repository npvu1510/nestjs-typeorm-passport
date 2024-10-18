import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RepositoryService } from 'src/repositories/repository.service';

import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly model: RepositoryService) {}

  async verifyUser(email: string, password: string) {
    const foundUser = await this.model.userRepository.findOne({
      where: { email },
    });

    if (!foundUser || !(await bcrypt.compare(password, foundUser.password)))
      throw new UnauthorizedException('Invalid email or password');

    return foundUser;
  }

  async register(registerDto: RegisterDto) {
    const userEntity = this.model.userRepository.create(registerDto);

    return this.model.userRepository.save(userEntity);
  }
  async login() {
    return 'loginService';
  }
}
