import { Module } from '@nestjs/common';
import { AssetCoreModule } from '@infrastructure/infrastructure/asset/asset-core.module';

@Module({
  imports: [AssetCoreModule],
})
export class StorageModule {}
