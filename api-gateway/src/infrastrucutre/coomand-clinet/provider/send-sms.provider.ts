import { Result } from '@common/result';
import { SendSmsRequest } from '../models/send-sms.model';

export interface ISendSmsWriter {
  sendSms(req: SendSmsRequest): Promise<Result<boolean>>;
}

export const SEND_SMS_WRITER = 'send-sms-writer';
