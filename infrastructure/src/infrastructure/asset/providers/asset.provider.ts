import { S3Client } from '@aws-sdk/client-s3';

export interface IAssetProvider {
  getS3CLinet(): S3Client;
}

export const PARSPACK_BUCKET_TOKEN = 'pars-pack-token';
