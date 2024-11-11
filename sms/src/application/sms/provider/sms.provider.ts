import { Result } from '@common/result';

export interface ISmsProvider {
  sendSms(phone: string, message: string): Promise<Result<boolean>>;
}

export const SMS_PROVIDER = 'sms-provider';
