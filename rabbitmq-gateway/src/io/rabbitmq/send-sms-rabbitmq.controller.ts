import { AbstractRabbitMQController } from '@common/rabbitmq/abstract-rabbitmq.controller';
import { Logger } from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Stream } from '@common/rabbitmq/stream.interface';
import { SendSmsCreate } from '@common/streams/send-sms.model';
import { HandleError } from '@common/decorators/handle-error.decorator';

export class SendSmsRabbitmqController extends AbstractRabbitMQController {
  private readonly logger = new Logger(SendSmsRabbitmqController.name);
  private readonly channelWrapper: ChannelWrapper;

  constructor() {
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
    console.log(msg);
  }
}
