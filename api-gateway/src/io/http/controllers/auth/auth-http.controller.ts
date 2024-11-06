import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AbstractHttpController } from '@common/http/abstract-http.controller';
import { Ok } from '@common/result';
import { UserService } from '@user/application/user/service/user.service';
import { LoginRequest, LoginResponse } from './model/login.model';
import { AuthService } from '@auth/application/auth/services/auth.service';
import { AuthGuard } from '../../guard/auth.guard';
import { GetUserId } from '../../decorators/get-user-id.decorator';
import {
  AuthSendCodeRequest,
  AuthSendCodeResponse,
} from './model/auth-send-code.model';
import { APP_CONFIG_TOKEN, IAppConfig } from '../../../../app.config';
import { ConfigService } from '@nestjs/config';

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

  @Post('verify')
  @UsePipes(new ValidationPipe())
  @ApiResponse({ type: LoginResponse })
  @ApiBody({ type: LoginRequest })
  async login(@Res() response: Response, @Body() body: LoginRequest) {
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
      Ok<LoginResponse>({
        id: user.value.id,
        phone: user.value.phone,
        accessToken: createNewAuth.value.accessToken,
        refreshToken: createNewAuth.value.refreshToken,
      }),
    );
  }

  @Post('auth/sendCode')
  async sendCode(@Res() response: Response, @Body() body: AuthSendCodeRequest) {
    const user = await this.userService.getUserByPhone(body.phone);
    if (user.isError()) {
      this.sendResult(response, user);
      return;
    }

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

  @Post('auth/VerifyCode')
  async verifyCode(@Res() response: Response) {}
}
