import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { HandleError } from '@common/decorators/handle-error.decorator';
import { Reflector } from '@nestjs/core';
import { RBAC_KEY } from '../decorators/rbac.decorator';
import { Role } from '@user/application/user/enum/role.enum';

@Injectable()
export class RBACGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  @HandleError
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userRole = request.userRole;
    const roles = this.reflector.getAllAndOverride<Role[]>(RBAC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) {
      return true;
    }

    return roles.includes(userRole);
  }
}
