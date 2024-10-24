import { Module } from '@nestjs/common';
import { AuthHttpController } from './http/controllers/auth/auth-http.controller';
import { UserModule } from '@user/application/user/user.module';
import { AuthModule } from '@auth/application/auth/auth.module';
import { AuthGuard } from './http/guard/auth.guard';
import { DashboardHttpController } from './http/controllers/dashboard/dashboard-http.controller';
import { ProductModule } from '@product/application/product/product.module';
import { CommentModule } from '@comment/application/comment/comment.module';
import { HealthCheckController } from './http/controllers/health/health-check.controller';
import { PaymentModule } from '@payment/application/payment/payment.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ProductModule,
    CommentModule,
    PaymentModule,
  ],
  controllers: [
    AuthHttpController,
    DashboardHttpController,
    HealthCheckController,
  ],
  providers: [AuthGuard],
})
export class IoModule {}
