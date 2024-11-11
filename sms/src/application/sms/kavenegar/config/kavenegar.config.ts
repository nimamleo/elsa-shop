import { ConfigFactory, registerAs } from '@nestjs/config';
import * as process from 'node:process';

export interface IKavenegarConfig {
  sender: string;
  apiKey: string;
}

export const KAVENEGAR_SMS_CONFIG = 'kavenegar-sms-config';

export const kavenegarConfig = registerAs<
  IKavenegarConfig,
  ConfigFactory<IKavenegarConfig>
>(KAVENEGAR_SMS_CONFIG, () => {
  if (!process.env.KAVENEGAR_API_KEY) {
    throw new Error('KAVENEGAR_API_KEY not provided');
  }

  if (!process.env.KAVENEGAR_SENDER) {
    throw new Error('KAVENEGAR_SENDER not peovided');
  }

  return {
    apiKey: process.env.KAVENEGAR_API_KEY,
    sender: process.env.KAVENEGAR_SENDER,
  };
});
