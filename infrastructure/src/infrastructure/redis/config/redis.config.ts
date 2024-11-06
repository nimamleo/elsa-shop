import { ConfigFactory, registerAs } from '@nestjs/config';
import * as process from 'node:process';

export interface IRedisConfig {
  host: string;
  password: string;
  username: string;
  port: number;
}

export const REDIS_CONFIG_TOKEN = 'redis-config-token';

export const redisConfig = registerAs<
  IRedisConfig,
  ConfigFactory<IRedisConfig>
>(REDIS_CONFIG_TOKEN, () => {
  if (!process.env.REDIS_HOST) {
    throw new Error('REDIS_HOST not provided');
  }

  if (!process.env.REDIS_PORT) {
    throw new Error('REDIS_PORT not provided');
  }

  return {
    host: process.env.REDIS_HOST,
    port: +process.env.REDIS_PORT,
    password: '',
    username: '',
  };
});
