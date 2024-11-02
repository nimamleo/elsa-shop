import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AssetService } from './service/asset-service';
import {
  IParspackConfig,
  PARSPACK_CONFIG_TOKEN,
} from './config/parspack.config';
import { PARSPACK_BUCKET_TOKEN } from './providers/asset.provider';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: PARSPACK_BUCKET_TOKEN,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const parspackConfig = configService.get<IParspackConfig>(
          PARSPACK_CONFIG_TOKEN,
        );
        return new AssetService(
          parspackConfig.accessKey,
          parspackConfig.secretKey,
          parspackConfig.endpointUrl,
        );
      },
    },
  ],
  exports: [PARSPACK_BUCKET_TOKEN],
})
export class AssetCoreModule {}
