import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserService } from './service/user.service';

@Module({
  imports: [DatabaseModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
