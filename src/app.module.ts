import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { ConfigEnvironmentBaseModule } from './base/config/config-environment.base.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigEnvironmentBaseModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
