import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FirebaseConnection } from 'src/core/auth/firebase-connection';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const bearerHeader = request.headers.authorization;
    const accessToken = bearerHeader && bearerHeader.split(' ')[1];

    const user = await FirebaseConnection.getUserClaims(accessToken);
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
