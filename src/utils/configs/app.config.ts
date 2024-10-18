import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig({});

export const appConfig = {
  // db
  DB_TYPE: process.env.DB_TYPE,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
};

export default registerAs('app', () => appConfig);
