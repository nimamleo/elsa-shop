import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '@user/application/user/service/user.service';
import { Request } from 'express';
import { GenericStatusCodes } from '@common/enums/status.enum';
import { AuthService } from '@auth/application/auth/services/auth.service';
import { HandleError } from '@common/decorators/handle-error.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  @HandleError
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    if (!token) {
      return false;
    }

    const bearerToken = token.split(' ');
    if (bearerToken[0] !== 'Bearer') {
      return false;
    }

    const getUserIdRes = await this.authService.extractUserId(bearerToken[1]);
    if (getUserIdRes.isError()) {
      return false;
    }

    const userExist = await this.userService.getUserById(getUserIdRes.value);
    if (userExist.isError()) {
      if (userExist.err._code == GenericStatusCodes.NOT_FOUND) {
        throw UnauthorizedException;
      }
      return false;
    }

    request['userId'] = getUserIdRes.value;

    return true;
  }
}
