import { Controller, Post, Res } from '@nestjs/common';
import { AbstractHttpController } from '../../../../../common/http/abstract-http.controller';
import { Err } from '../../../../../common/result';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { GenericStatusCodes } from '../../../../../common/enums/status.enum';

@ApiTags('auth')
@Controller('auth')
export class AuthHttpController extends AbstractHttpController {
  constructor() {
    super();
  }

  @Post('verify')
  async login(@Res() response: Response) {
    this.sendResult(response, Err('login', GenericStatusCodes.NOT_FOUND));
  }
}
