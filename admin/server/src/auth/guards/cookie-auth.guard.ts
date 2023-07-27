import {
  ExecutionContext,
  Injectable,
  CanActivate,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class CookieAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (request.isAuthenticated())
      throw new UnauthorizedException({
        success: false,
        message: 'You are not logged in',
      });
    return true;
  }
}
