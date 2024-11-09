import { ConfigFactory, registerAs } from '@nestjs/config';
import * as process from 'node:process';

export interface IAppConfig {
  baseUrl: string;
  debug: boolean;
}

export const APP_CONFIG_TOKEN = 'app-config-token';

export const appConfig = registerAs<IAppConfig, ConfigFactory<IAppConfig>>(
  APP_CONFIG_TOKEN,
  () => {
    if (!process.env.APP_BASE_URL) {
      throw new Error('APP_BASE_URL not provided');
    }

    if (!process.env.APP_DEBUG) {
      throw new Error('APP_DEBUG not provided');
    }

    return {
      baseUrl: process.env.APP_BASE_URL,
      debug: process.env.APP_DEBUG === 'true',
    };
  },
);
