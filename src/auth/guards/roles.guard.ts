import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  // constructor(private reflector: Reflector) {}

  // canActivate(context: ExecutionContext): boolean {
  //   const requiredRoles = this.reflector.get<Role[]>(ROLES_KEY, [
  //     context.getHandler(),
  //     context.getClass(),
  //   ]);
  //   if (!requiredRoles) {
  //     return true;
  //   }
  //   const { user } = context.switchToHttp().getRequest();
  //   return requiredRoles.includes(user.role);
  // }
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (!request.user) {
      return false;
    }

    return request.user.role === Role.Admin;
  }
}
