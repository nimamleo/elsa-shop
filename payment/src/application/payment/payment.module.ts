import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { PaymentService } from './service/payment.service';

@Module({
  imports: [DatabaseModule],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
