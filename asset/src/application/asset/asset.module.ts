import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AssetService } from './service/asset.service';
import { AssetCoreModule } from '@infrastructure/infrastructure/asset/asset-core.module';

@Module({
  imports: [DatabaseModule, AssetCoreModule.register()],
  providers: [AssetService],
  exports: [AssetService],
})
export class AssetModule {}
