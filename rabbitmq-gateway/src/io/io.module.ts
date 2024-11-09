import { Module } from '@nestjs/common';
import { SendSmsRabbitmqController } from './rabbitmq/send-sms-rabbitmq.controller';

@Module({
  controllers: [SendSmsRabbitmqController],
})
export class IoModule {}
