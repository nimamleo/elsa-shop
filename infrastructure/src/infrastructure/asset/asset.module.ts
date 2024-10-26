import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';

@Module({})
export class AssetModule {
  static register(): DynamicModule {
    return {
      module: AssetModule,
      imports: [ConfigModule],
      providers: [
        {
          provide: S3_PROVIDER_TOKEN,
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            const s3Config = configService.get('');
            return new S3Client({
              credentials: { accessKeyId: '', secretAccessKey: '' },
            });
          },
        },
      ],
      exports: [S3_PROVIDER_TOKEN],
    };
  }
}

export const S3_PROVIDER_TOKEN = 's3-provider-token';
