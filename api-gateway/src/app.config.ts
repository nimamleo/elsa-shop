import { ConfigFactory, registerAs } from '@nestjs/config';
import * as process from 'node:process';

export interface IAppConfig {
  port: number;
}

export const APP_CONFIG = 'app-config';

export const appConfig = registerAs<IAppConfig, ConfigFactory<IAppConfig>>(
  APP_CONFIG,
  () => {
    if (!process.env.HTTP_PORT) {
      throw new Error('HTTP_PORT not provided');
    }

    return {
      port: +process.env.HTTP_PORT,
    };
  },
);
