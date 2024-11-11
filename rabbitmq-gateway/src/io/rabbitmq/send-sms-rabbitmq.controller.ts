import { AbstractRabbitMQController } from '@common/rabbitmq/abstract-rabbitmq.controller';
import { Inject, Logger } from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Stream } from '@common/rabbitmq/stream.interface';
import { SendSmsCreate, SendSmsCreated } from '@common/streams/send-sms.model';
import { HandleError } from '@common/decorators/handle-error.decorator';
import {
  ISmsProvider,
  SMS_PROVIDER,
} from '@sms/application/sms/provider/sms.provider';

export class SendSmsRabbitmqController extends AbstractRabbitMQController {
  private readonly logger = new Logger(SendSmsRabbitmqController.name);
  private readonly channelWrapper: ChannelWrapper;

  constructor(
    @Inject(SMS_PROVIDER) private readonly smsProvider: ISmsProvider,
  ) {
    super();
    this.channelWrapper = amqp.connect(['amqp://localhost']).createChannel();
  }

  Logger(): Logger {
    return this.logger;
  }

  client(): ChannelWrapper {
    return this.channelWrapper;
  }

  streams(): Stream[] {
    return [
      {
        name: new SendSmsCreate().streamKey(),
        payload: (data) => this.sendSms(data),
      },
    ];
  }

  @HandleError
  async sendSms(msg: SendSmsCreate) {
    const res = await this.smsProvider.sendSms(msg.phone, msg.message);
    if (res.isError()) {
      return;
    }

    const data = new SendSmsCreated({ success: true });

    await this.addToQueue('SendSms', {
      name: data.streamKey(),
      value: data,
    });
  }
}
