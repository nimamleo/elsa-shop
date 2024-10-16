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
import { GenericStatusCodes } from '@common/enums/status.enum';
import { AbstractHttpController } from '@common/http/abstract-http.controller';
import { Err, Ok } from '@common/result';
import { UserService } from '@user/application/user/service/user.service';
import { LoginRequest, LoginResponse } from './model/login.model';

@ApiTags('auth')
@Controller('auth')
export class AuthHttpController extends AbstractHttpController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @Post('verify')
  @UsePipes(new ValidationPipe())
  @ApiResponse({ type: LoginResponse })
  @ApiBody({ type: LoginRequest })
  async login(@Res() response: Response, @Body() body: LoginRequest) {
    const loginUser = await this.userService.loginUser(body.phone);
    if (loginUser.isError()) {
      this.sendResult(response, loginUser);
      return;
    }

    this.sendResult(
      response,
      Ok<LoginResponse>({
        id: loginUser.value.id,
        phone: loginUser.value.phone,
        accessToken: 'coming soon',
      }),
    );
  }
}
