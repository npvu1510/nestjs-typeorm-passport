import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { config as dotenvConfig } from 'dotenv';
import { ConfigEnvironmentBaseService } from 'src/base/config/config-environent.base.service';
import * as path from 'path';
dotenvConfig({});

export const TYPEORM_CONFIG = {
  type: ConfigEnvironmentBaseService.getIns().get('DB_TYPE') || 'mysql',

  host: ConfigEnvironmentBaseService.getIns().get('DB_HOST') || 'localhost',
  port:
    parseInt(ConfigEnvironmentBaseService.getIns().get('DB_PORT'), 10) || 3307,

  username: ConfigEnvironmentBaseService.getIns().get('DB_USERNAME') || 'root',
  password:
    ConfigEnvironmentBaseService.getIns().get('DB_PASSWORD') || 'password',

  database: ConfigEnvironmentBaseService.getIns().get('DB_NAME') || 'mysql',
  entities: [
    path.resolve(__dirname, '../../repositories/entities/*.entity{.ts,.js}'),
  ],

  // entities: [User],

  autoLoadEntities: true,
  synchronize: true,
} as TypeOrmModuleOptions;

// console.log('TYPEORM_CONFIG');
export default registerAs('typeorm', () => TYPEORM_CONFIG);
