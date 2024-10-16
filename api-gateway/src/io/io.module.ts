import { Module } from '@nestjs/common';
import { AuthHttpController } from './http/controllers/auth-http.controller';
import { UserModule } from '@user/application/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AuthHttpController],
})
export class IoModule {}
