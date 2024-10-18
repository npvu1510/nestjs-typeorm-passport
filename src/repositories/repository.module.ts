import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User.entity';

import { RepositoryService } from './repository.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [RepositoryService],
  exports: [RepositoryService],
})
export class RepositoryModule {}
