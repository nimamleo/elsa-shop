import { Module } from '@nestjs/common';
import { CoreDatabaseModule } from '@infrastructure/infrastructure/database/coreDatabase.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './pgsql/entities/product.entity';
import { CategoryEntity } from './pgsql/entities/category.entity';
import { InfoEntity } from './pgsql/entities/info.entity';
import { PRODUCT_DATABASE_PROVIDER } from './provider/product.provider';
import { ProductPgsqlService } from './pgsql/service/product-pgsql.service';
import { BasketEntity } from './pgsql/entities/basket.entity';
import { ColorEntity } from './pgsql/entities/color.entity';
import { SizeEntity } from './pgsql/entities/size.entity';
import { CountryEntity } from './pgsql/entities/country.entity';
import { QualityEntity } from './pgsql/entities/quality.entity';

@Module({
  imports: [
    CoreDatabaseModule.register(),
    TypeOrmModule.forFeature([
      ProductEntity,
      CategoryEntity,
      InfoEntity,
      BasketEntity,
      ColorEntity,
      SizeEntity,
      CountryEntity,
      QualityEntity,
    ]),
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
