import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AssetService } from './service/asset.service';

@Module({
  imports: [DatabaseModule],
  providers: [AssetService],
  exports: [AssetService],
})
export class AssetModule {}
