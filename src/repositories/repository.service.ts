import { Injectable } from '@nestjs/common';
import { User } from './entities/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RepositoryService {
  constructor(
    @InjectRepository(User) public readonly userRepository: Repository<User>,
  ) {}
}
