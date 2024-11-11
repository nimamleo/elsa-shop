import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SMS_PROVIDER } from './provider/sms.provider';
import { SmsKavenegarService } from './kavenegar/sms-kavenegar.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: SMS_PROVIDER,
      useClass: SmsKavenegarService,
    },
  ],
  exports: [SMS_PROVIDER],
})
export class SmsModule {}
