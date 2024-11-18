import {
  Body,
  Controller,
  Inject,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AbstractHttpController } from '@common/http/abstract-http.controller';
import { Err, Ok } from '@common/result';
import { UserService } from '@user/application/user/service/user.service';
import { AuthService } from '@auth/application/auth/services/auth.service';
import {
  AuthSendCodeRequest,
  AuthSendCodeResponse,
} from './model/auth-send-code.model';
import { APP_CONFIG_TOKEN, IAppConfig } from '../../../../app.config';
import { ConfigService } from '@nestjs/config';
import {
  AuthVerifyCodeRequest,
  AuthVerifyCodeResponse,
} from './model/auth-verify-code.model';
import { GenericStatusCodes } from '@common/enums/status.enum';
import {
  ISendSmsWriter,
  SEND_SMS_WRITER,
} from '../../../../infrastrucutre/coomand-clinet/provider/send-sms.provider';
import { RandomNumber } from '@common/utils/random-number';

@ApiTags('auth')
@Controller('auth')
export class AuthHttpController extends AbstractHttpController {
  private readonly appConfig: IAppConfig;
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    @Inject(SEND_SMS_WRITER)
    private readonly smsWriter: ISendSmsWriter,
    configService: ConfigService,
  ) {
    super();
    this.appConfig = configService.get(APP_CONFIG_TOKEN);
  }

  @Post('sendCode')
  @UsePipes(new ValidationPipe())
  @ApiResponse({ type: AuthSendCodeResponse })
  @ApiBody({ type: AuthSendCodeRequest })
  async sendCode(@Res() response: Response, @Body() body: AuthSendCodeRequest) {
    const getCode = await this.authService.getCode(body.phone);
    if (getCode.isError()) {
      if (getCode.err._code === GenericStatusCodes.NOT_FOUND) {
        let code: number = 12654;
        if (!this.appConfig.debug) {
          code = RandomNumber(5);
        }
        await this.authService.cacheCode(body.phone, code);

        if (!this.appConfig.debug) {
          await this.smsWriter.sendSms({
            phone: body.phone,
            message: `${code}`,
          });
        }
        this.sendResult(
          response,
          Ok<AuthSendCodeResponse>({
            code: code,
            ttl: 120,
            phone: body.phone,
          }),
        );
        return;
      }
      this.sendResult(response, getCode);
      return;
    }

    this.sendResult(
      response,
      Ok<AuthSendCodeResponse>({
        code: getCode.value.code,
        ttl: getCode.value.ttl,
        phone: body.phone,
      }),
    );
  }

  @Post('VerifyCode')
  @UsePipes(new ValidationPipe())
  @ApiResponse({ type: AuthVerifyCodeResponse })
  @ApiBody({ type: AuthVerifyCodeRequest })
  async verifyCode(
    @Res() response: Response,
    @Body() body: AuthVerifyCodeRequest,
  ) {
    const verifyCode = await this.authService.verifyCode(body.code, body.phone);
    if (verifyCode.isError()) {
      if (verifyCode.err._code == GenericStatusCodes.NOT_FOUND) {
        this.sendResult(
          response,
          Err(
            'code is not valid anymore or has expired',
            GenericStatusCodes.NOT_FOUND,
          ),
        );
        return;
      }
      this.sendResult(response, verifyCode);
      return;
    }
    if (!verifyCode.value) {
      this.sendResult(
        response,
        Err(
          'code is not valid anymore or has expired',
          GenericStatusCodes.NOT_FOUND,
        ),
      );
      return;
    }

    let user = await this.userService.getUserByPhone(body.phone);
    if (user.isError()) {
      user = await this.userService.createUser({
        phone: body.phone,
      });
      if (user.isError()) {
        this.sendResult(response, user);
        return;
      }
    }

    const createNewAuth = await this.authService.verifyAuth(user.value.id);
    if (createNewAuth.isError()) {
      this.sendResult(response, createNewAuth);
      return;
    }

    this.sendResult(
      response,
      Ok<AuthVerifyCodeResponse>({
        id: user.value.id,
        phone: user.value.phone,
        accessToken: createNewAuth.value.accessToken,
        refreshToken: createNewAuth.value.refreshToken,
      }),
    );
  }
}
