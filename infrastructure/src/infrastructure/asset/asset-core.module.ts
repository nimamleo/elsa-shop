import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PARSPACK_BUCKET_TOKEN } from './providers/asset.provider';
import { AssetService } from './service/asset-service';
import { IAssetConfig } from './config/asset.config';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: PARSPACK_BUCKET_TOKEN,
      useFactory: (configService: ConfigService) => {
        const parspackConfig = configService.get<IAssetConfig>(
          PARSPACK_BUCKET_TOKEN,
        );
        const client = new AssetService(
          parspackConfig.accessKey,
          parspackConfig.secretKey,
        );

        return client;
      },
    },
  ],
  exports: [PARSPACK_BUCKET_TOKEN],
})
export class AssetCoreModule {}
