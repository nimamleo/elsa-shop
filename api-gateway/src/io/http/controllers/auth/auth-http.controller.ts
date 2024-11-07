import {
  Body,
  Controller,
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

@ApiTags('auth')
@Controller('auth')
export class AuthHttpController extends AbstractHttpController {
  private readonly appConfig: IAppConfig;
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
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
    const generateCode = await this.authService.generateCode(body.phone);
    if (generateCode.isError()) {
      this.sendResult(response, generateCode);
      return;
    }

    if (!this.appConfig.debug) {
      //add event in RABBITMQ QUEUE
    }

    this.sendResult(
      response,
      Ok<AuthSendCodeResponse>({
        code: generateCode.value.code,
        ttl: generateCode.value.ttl,
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
