import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AssetService } from './service/asset.service';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [DatabaseModule, StorageModule],
  providers: [AssetService],
  exports: [AssetService],
})
export class AssetModule {}
