import { Injectable } from '@nestjs/common';
import { IAssetProvider } from '../providers/asset.provider';
import { S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class AssetService implements IAssetProvider {
  private readonly S3: S3Client;
  constructor(accessKey: string, secretKey: string) {
    this.S3 = new S3Client({
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
      },
    });
  }

  getS3CLinet(): S3Client {
    return this.S3;
  }
}
