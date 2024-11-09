import { AbstractRabbitMQController } from '@common/rabbitmq/abstract-rabbitmq.controller';
import { ISendSmsWriter } from '../../provider/send-sms.provider';
import { Stream } from '@common/rabbitmq/stream.interface';
import { Logger } from '@nestjs/common';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Ok, Result } from '@common/result';
import { SendSmsRequest } from '../../models/send-sms.model';
import { HandleError } from '@common/decorators/handle-error.decorator';
import { SendSmsCreate } from '@common/streams/send-sms.model';

export class SendSmsSmsRabbitmqService
  extends AbstractRabbitMQController
  implements ISendSmsWriter
{
  private readonly logger: Logger = new Logger(SendSmsSmsRabbitmqService.name);
  private channelWrapper: ChannelWrapper;

  constructor() {
    super();
    this.channelWrapper = amqp.connect(['amqp://localhost']).createChannel();
  }

  streams(): Stream[] {
    return [];
  }

  Logger(): Logger {
    return this.logger;
  }

  client() {
    return this.channelWrapper;
  }

  @HandleError
  async sendSms(req: SendSmsRequest): Promise<Result<boolean>> {
    const data = new SendSmsCreate({ phone: req.phone, message: req.message });

    const res = await this.addToQueue('SendSms', {
      name: data.streamKey(),
      value: data,
    });

    return Ok(!!res.value);
  }
}
