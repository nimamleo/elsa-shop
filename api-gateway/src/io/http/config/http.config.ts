import { ConfigFactory, registerAs } from '@nestjs/config';
import * as process from 'node:process';

export interface IHttpConfig {
  port: number;
}

export const HTTP_CONFIG_TOKEN = 'http-config-token';

export const httpConfig = registerAs<IHttpConfig, ConfigFactory<IHttpConfig>>(
  HTTP_CONFIG_TOKEN,
  () => {
    if (!process.env.HTTP_PORT) {
      throw new Error('HTTP_PORT not provided');
    }

    return {
      port: +process.env.HTTP_PORT,
    };
  },
);
