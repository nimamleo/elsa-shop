import { Module } from '@nestjs/common';
import { CoreDatabaseModule } from '@infrastructure/infrastructure/database/coreDatabase.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './pgsql/entities/product.entity';
import { CategoryEntity } from './pgsql/entities/category.entity';
import { InfoEntity } from './pgsql/entities/info.entity';
import { PRODUCT_DATABASE_PROVIDER } from './provider/product.provider';
import { ProductPgsqlService } from './pgsql/service/product-pgsql.service';

@Module({
  imports: [
    CoreDatabaseModule.register(),
    TypeOrmModule.forFeature([ProductEntity, CategoryEntity, InfoEntity]),
  ],
  providers: [
    {
      provide: PRODUCT_DATABASE_PROVIDER,
      useClass: ProductPgsqlService,
    },
  ],
  exports: [PRODUCT_DATABASE_PROVIDER],
})
export class DatabaseModule {}
