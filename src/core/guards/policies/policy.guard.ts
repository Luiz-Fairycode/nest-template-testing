import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FirebaseConnection } from 'src/core/auth/firebase-connection';
import { POLICIES_KEY } from './policy.decorator';
import { Policy } from './policy.enum';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPolicies = this.reflector.getAllAndOverride<Policy[]>(
      POLICIES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPolicies) return true;

    const request = context.switchToHttp().getRequest();
    const bearerHeader = request.headers.authorization;
    const accessToken = bearerHeader && bearerHeader.split(' ')[1];

    const user = await FirebaseConnection.getUserClaims(accessToken);
    return requiredPolicies.some((policy) => user.policies?.includes(policy));
  }
}
