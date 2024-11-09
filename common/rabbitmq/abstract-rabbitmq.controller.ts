import { Stream } from "./stream.interface";
import { ChannelWrapper } from "amqp-connection-manager";
import { Err, Ok, Result } from "../result";
import { GenericStatusCodes } from "../enums/status.enum";
import { Message } from "./message.model";
import { ConfirmChannel } from "amqplib";

export abstract class AbstractRabbitMQController {
  abstract Logger(): any;

  abstract client(): ChannelWrapper;

  abstract streams(): Stream[];

  async createQueue(queueName: string) {
    const queue = await this.client().assertQueue(queueName);
    if (!queue) {
      this.Logger().error(`can not create queue`);
      return Err("create queue failed", GenericStatusCodes.INTERNAL);
    }
    this.Logger().verbose(`queue with name ${queueName} created`);
    return queue;
  }

  async addToQueue<T>(
    queueName: string,
    value: Message<T>,
  ): Promise<Result<boolean>> {
    await this.createQueue(queueName);
    const res = await this.client().sendToQueue(
      queueName,
      Buffer.from(JSON.stringify(value)),
      { persistent: true },
    );

    if (!res) {
      this.Logger().error(`add value to Queue:${queueName} failed`);
      return Err(
        `add value to Queue:${queueName} failed`,
        GenericStatusCodes.INTERNAL,
      );
    }
    this.Logger().verbose(
      `value ${JSON.stringify(value)} added to Queue:${queueName}`,
    );

    return Ok(res);
  }

  async consumeQueue(queueName: string) {
    this.Logger().verbose(`consuming Queue:${queueName}`);
    await this.client().addSetup(async (c: ConfirmChannel) => {
      await c.assertQueue(queueName);
      await c.consume(queueName, async (msg) => {
        if (msg) {
          const content = JSON.parse(msg.content.toString());
          const target = this.streams().find((x) => x.name == content.name);
          await target.payload(content.value);

          c.ack(msg);
          return content;
        }
      });
    });
  }
}
