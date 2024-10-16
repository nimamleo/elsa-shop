import { ConfigFactory, registerAs } from '@nestjs/config';
import * as process from 'node:process';

export interface IPgsqlConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

export const PGSQL_CONFIG_TOKEN = 'pgsql-config-token';

export const pgsqlConfig = registerAs<
  IPgsqlConfig,
  ConfigFactory<IPgsqlConfig>
>(PGSQL_CONFIG_TOKEN, () => {
  if (!process.env.PGSQL_HOST) {
    throw new Error('PGSQL_HOST not provided');
  }
  if (!process.env.PGSQL_HOST) {
    throw new Error('PGSQL_HOST not provided');
  }
  if (!process.env.PGSQL_PASSWORD) {
    throw new Error('PGSQL_PASSWORD not provided');
  }
  if (!process.env.PGSQL_USERNAME) {
    throw new Error('PGSQL_USERNAME not provided');
  }
  if (!process.env.PGSQL_PORT) {
    throw new Error('PGSQL_PORT not provided');
  }
  if (!process.env.PGSQL_DATABASE) {
    throw new Error('PGSQL_DATABASE not provided');
  }
  return {
    host: process.env.PGSQL_HOST,
    port: +process.env.PGSQL_PORT,
    user: process.env.PGSQL_USERNAME,
    password: process.env.PGSQL_PASSWORD,
    database: process.env.PGSQL_DATABASE,
  };
});
