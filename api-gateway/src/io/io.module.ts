import { Module } from '@nestjs/common';
import { AuthHttpController } from './http/controllers/auth/auth-http.controller';
import { UserModule } from '@user/application/user/user.module';
import { AuthModule } from '@auth/application/auth/auth.module';
import { AuthGuard } from './http/guard/auth.guard';
import { DashboardHttpController } from './http/controllers/dashboard/dashboard-http.controller';
import { ProductModule } from '@product/application/product/product.module';

@Module({
  imports: [UserModule, AuthModule, ProductModule],
  controllers: [AuthHttpController, DashboardHttpController],
  providers: [AuthGuard],
})
export class IoModule {}
