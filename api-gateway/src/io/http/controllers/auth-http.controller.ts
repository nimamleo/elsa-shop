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
import { AuthGuard } from './guard/auth.guard';
import { GetUserId } from './decorators/get-user-id.decorator';

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

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async test(@Res() response: Response, @GetUserId() userId: string) {
    this.sendResult(response, Ok(userId));
  }
}
