import { Module } from '@nestjs/common';
import { AssetCoreModule } from '@infrastructure/infrastructure/asset/asset-core.module';
import { ASSET_STORAGE_PROVIDER } from './provider/storage.provider';
import { StorageS3Service } from './S3/storage-s3.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [AssetCoreModule, ConfigModule],
  providers: [
    {
      provide: ASSET_STORAGE_PROVIDER,
      useClass: StorageS3Service,
    },
  ],
  exports: [ASSET_STORAGE_PROVIDER],
})
export class StorageModule {}
