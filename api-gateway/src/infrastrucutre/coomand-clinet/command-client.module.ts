import { Module } from '@nestjs/common';
import { SEND_SMS_WRITER } from './provider/send-sms.provider';
import { SendSmsSmsRabbitmqService } from './service/rabbitmq/send-sms-rabbitmq.service';

@Module({
  providers: [
    {
      provide: SEND_SMS_WRITER,
      useClass: SendSmsSmsRabbitmqService,
    },
  ],
  exports: [SEND_SMS_WRITER],
})
export class CommandClientModule {}
