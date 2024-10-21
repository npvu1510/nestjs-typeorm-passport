import { Injectable } from '@nestjs/common';
import { User } from 'src/repositories/entities/User.entity';
import { RepositoryService } from 'src/repositories/repository.service';

import { DeepPartial, FindOneOptions, FindOptionsWhere } from 'typeorm';
import { RegisterDto } from '../auth/dtos/register.dto';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

import * as lodash from 'lodash';

@Injectable()
export class UsersService {
  constructor(private readonly model: RepositoryService) {}

  // READ
  findOne(options: FindOneOptions) {
    return this.model.userRepository.findOne(options);
  }

  // WRITE
  async create<T extends keyof User>(
    registerDto: RegisterDto,
    select?: T | T[],
  ) {
    const entity = await this.model.userRepository.create(registerDto);
    const newUser = await this.model.userRepository.save(entity);

    return select
      ? Array.isArray(select)
        ? lodash.pick(newUser, select)
        : lodash.pick(newUser, [select])
      : newUser;
  }

  update(options: FindOptionsWhere<User>, data: QueryDeepPartialEntity<User>) {
    return this.model.userRepository.update(options, data);
  }
}
