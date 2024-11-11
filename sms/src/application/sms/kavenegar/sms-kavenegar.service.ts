import { Injectable, Logger } from '@nestjs/common';
import { ISmsProvider } from '../provider/sms.provider';
import { Err, Ok, Result } from '@common/result';
import { HandleError } from '@common/decorators/handle-error.decorator';
import {
  IKavenegarConfig,
  KAVENEGAR_SMS_CONFIG,
} from './config/kavenegar.config';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { SmsResponse } from './model/send-sms.model';
import { GenericStatusCodes } from '@common/enums/status.enum';

@Injectable()
export class SmsKavenegarService implements ISmsProvider {
  private readonly kavenegarConfig: IKavenegarConfig;
  private readonly logger = new Logger(SmsKavenegarService.name);

  constructor(configService: ConfigService) {
    this.kavenegarConfig = configService.get(KAVENEGAR_SMS_CONFIG);
  }
  @HandleError
  async sendSms(phone: string, message: string): Promise<Result<boolean>> {
    const url = `https://api.kavenegar.com/v1/${this.kavenegarConfig.apiKey}/sms/send.json?receptor=${phone}&sender=${this.kavenegarConfig.sender}&message=${message}`;
    const res = await axios.get<SmsResponse>(url);

    if (res.status !== 200) {
      return Err('some thing went wrong', GenericStatusCodes.INTERNAL);
    }

    this.logger.verbose('sms sent successfully');
    return Ok(true);
  }
}
