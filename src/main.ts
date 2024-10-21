import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigEnvironmentBaseService } from './base/config/config-environent.base.service';
import { ValidationPipe } from '@nestjs/common';

import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // forbidNonWhitelisted: true,
    }),
  );

  await app.listen(+ConfigEnvironmentBaseService.getIns().get<number>('PORT'));
}
bootstrap();
