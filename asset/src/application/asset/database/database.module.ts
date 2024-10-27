import { Module } from '@nestjs/common';
import { CoreDatabaseModule } from '@infrastructure/infrastructure/database/coreDatabase.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetModule } from '../asset.module';
import { ASSET_DATABASE_PROVIDER } from './provider/asset.provider';
import { AssetPgsqlService } from './pgsql/services/asset-pgsql.service';

@Module({
  imports: [CoreDatabaseModule, TypeOrmModule.forFeature([AssetModule])],
  providers: [
    {
      provide: ASSET_DATABASE_PROVIDER,
      useClass: AssetPgsqlService,
    },
  ],
  exports: [ASSET_DATABASE_PROVIDER],
})
export class DatabaseModule {}
