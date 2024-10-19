import { Module } from '@nestjs/common';
import { AuthHttpController } from './http/controllers/auth-http.controller';
import { UserModule } from '@user/application/user/user.module';
import { AuthModule } from '@auth/application/auth/auth.module';
import { AuthGuard } from './http/controllers/guard/auth.guard';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [AuthHttpController],
  providers: [AuthGuard],
})
export class IoModule {}
