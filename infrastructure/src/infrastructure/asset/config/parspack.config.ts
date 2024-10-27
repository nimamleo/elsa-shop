import { ConfigFactory, registerAs } from '@nestjs/config';
import { IAssetConfig } from './asset.config';

export interface IParspackConfig extends IAssetConfig {
  accessKey: string;
  secretKey: string;
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

  return {
    accessKey: process.env.BUCKET_ACCESS_KEY,
    secretKey: process.env.BUCKET_SECRET_KEY,
  };
});
