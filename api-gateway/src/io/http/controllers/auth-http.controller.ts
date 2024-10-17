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
import { Ok } from '@common/result';
import { UserService } from '@user/application/user/service/user.service';
import { LoginRequest, LoginResponse } from './model/login.model';
import { AuthService } from '@auth/application/auth/services/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthHttpController extends AbstractHttpController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {
    super();
  }

  @Post('verify')
  @UsePipes(new ValidationPipe())
  @ApiResponse({ type: LoginResponse })
  @ApiBody({ type: LoginRequest })
  async login(@Res() response: Response, @Body() body: LoginRequest) {
    const createUser = await this.userService.loginUser(body.phone);
    if (createUser.isError()) {
      this.sendResult(response, createUser);
      return;
    }

    const assignToken = await this.authService.generateTokens(
      createUser.value.id,
    );
    if (assignToken.isError()) {
      this.sendResult(response, assignToken);
      return;
    }

    this.sendResult(
      response,
      Ok<LoginResponse>({
        id: createUser.value.id,
        phone: createUser.value.phone,
        accessToken: assignToken.value.accessToken,
        refreshToken: assignToken.value.refreshToken,
      }),
    );
  }
}
