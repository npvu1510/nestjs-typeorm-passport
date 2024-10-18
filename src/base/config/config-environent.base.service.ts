import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

@Injectable()
export class ConfigEnvironmentBaseService {
  private static configService: ConfigService;

  constructor() {
    if (!ConfigEnvironmentBaseService.configService) {
      // console.log('init configService');
      ConfigEnvironmentBaseService.configService = new ConfigService(
        process.env,
      );
      // console.log(ConfigEnvironmentBaseService.configService);
    }
  }

  public static getIns() {
    if (!ConfigEnvironmentBaseService.configService) {
      // console.log('init configService');
      ConfigEnvironmentBaseService.configService = new ConfigService(
        process.env,
      );
    }

    return ConfigEnvironmentBaseService.configService;
  }
}
