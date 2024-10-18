import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';

import { ConfigEnvironmentBaseService } from './config-environent.base.service';

// configs
import typeormConfig from 'src/utils/configs/typeorm.config';
import jwtConfig from 'src/utils/configs/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [typeormConfig, jwtConfig],
      isGlobal: true,
      validationSchema: joi.object({
        NODE_ENV: joi.string().default('development'),
        PORT: joi.number().default(3001),
      }),
      validationOptions: {
        abortEarly: false,
      },
    }),
  ],
  providers: [ConfigEnvironmentBaseService],
})
export class ConfigEnvironmentBaseModule {}
