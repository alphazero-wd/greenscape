import { CanActivate, ExecutionContext, Type, mixin } from '@nestjs/common';
import { Role, User } from '@prisma/client';
import { CookieAuthGuard } from './cookie-auth.guard';

export const RolesGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin extends CookieAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest();
      const user: User = request.user;

      return user.roles.includes(role);
    }
  }

  return mixin(RoleGuardMixin);
};
