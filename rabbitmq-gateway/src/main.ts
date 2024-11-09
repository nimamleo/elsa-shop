import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SendSmsRabbitmqController } from './io/rabbitmq/send-sms-rabbitmq.controller';
import { MicroserviceOptions } from '@nestjs/microservices';

async function main() {
  const app =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule);

  const sendSmsRabbitController = await app.resolve<SendSmsRabbitmqController>(
    SendSmsRabbitmqController,
  );
  await sendSmsRabbitController.consumeQueue('SendSms');

  await app.listen();
}

main();
