import { Module } from '@nestjs/common';
import { CoreDatabaseModule } from '@infrastructure/infrastructure/database/coreDatabase.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from './pgsql/entities/payment.entity';
import { PAYMENT_DATABASE_PROVIDER } from './provider/payment.provider';
import { PaymentPgsqlService } from './pgsql/services/payment-pgsql.service';

@Module({
  imports: [
    CoreDatabaseModule.register(),
    TypeOrmModule.forFeature([PaymentEntity]),
  ],
  providers: [
    {
      provide: PAYMENT_DATABASE_PROVIDER,
      useClass: PaymentPgsqlService,
    },
  ],
  exports: [PAYMENT_DATABASE_PROVIDER],
})
export class DatabaseModule {}
