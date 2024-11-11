import { Module } from '@nestjs/common';
import { SendSmsRabbitmqController } from './rabbitmq/send-sms-rabbitmq.controller';
import { SmsModule } from '@sms/application/sms/sms.module';

@Module({
  imports: [SmsModule],
  controllers: [SendSmsRabbitmqController],
})
export class IoModule {}
