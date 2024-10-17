import { Module } from '@nestjs/common';
import { AuthHttpController } from './http/controllers/auth-http.controller';
import { UserModule } from '@user/application/user/user.module';
import { AuthModule } from '@auth/application/auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [AuthHttpController],
})
export class IoModule {}
