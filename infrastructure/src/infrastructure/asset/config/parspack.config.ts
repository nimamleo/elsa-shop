import { ConfigFactory, registerAs } from '@nestjs/config';
import { IAssetConfig } from './asset.config';
import * as process from 'node:process';

export interface IParspackConfig extends IAssetConfig {
  accessKey: string;
  secretKey: string;
  endpointUrl: string;
  name: string;
}

export const PARSPACK_CONFIG_TOKEN = 'parspack-config-token';

export const parspackConfig = registerAs<
  IParspackConfig,
  ConfigFactory<IParspackConfig>
>(PARSPACK_CONFIG_TOKEN, () => {
  if (!process.env.BUCKET_ACCESS_KEY) {
    throw new Error('BUCKET_ACCESS_KEY not provided');
  }

  if (!process.env.BUCKET_SECRET_KEY) {
    throw new Error('BUCKET_SECRET_KEY not provided');
  }

  if (!process.env.BUCKET_NAME) {
    throw new Error('BUCKET_NAME not provided');
  }

  if (!process.env.BUCKET_ENDPOINT_URL) {
    throw new Error('BUCKET_ENDPOINT_URL not provided');
  }

  return {
    accessKey: process.env.BUCKET_ACCESS_KEY,
    secretKey: process.env.BUCKET_SECRET_KEY,
    endpointUrl: process.env.BUCKET_ENDPOINT_URL,
    name: process.env.BUCKET_NAME,
  };
});
