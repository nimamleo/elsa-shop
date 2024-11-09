import { StreamKey } from "../rabbitmq/stream-key";

export class SendSmsCreate implements StreamKey {
  phone: string;
  message: string;

  constructor(init?: Partial<SendSmsCreate>) {
    Object.assign(this, init);
  }

  streamKey(): string {
    return "sms:create";
  }
}
export class SendSmsCreated {}
