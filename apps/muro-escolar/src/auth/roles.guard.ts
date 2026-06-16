import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rolesRequeridos = this.reflector.get<string[]>('roles', context.getHandler());
    if (!rolesRequeridos) return true;

    const request = context.switchToHttp().getRequest();
    const usuario = request.user; // El usuario viene del Token JWT

    return usuario && rolesRequeridos.includes(usuario.role);
  }
}