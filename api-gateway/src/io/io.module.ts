import { Module } from '@nestjs/common';
import { AuthHttpController } from './http/controllers/auth-http.controller';

@Module({
  controllers: [AuthHttpController],
})
export class IoModule {}
