import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Aquí definimos los roles necesarios para acceder a una ruta
    const rolesRequeridos = this.reflector.get<string[]>('roles', context.getHandler());
    if (!rolesRequeridos) return true;

    const request = context.switchToHttp().getRequest();
    const usuario = request.user; // El usuario viene del Token JWT

    // Si el usuario no existe o su rol no está en la lista permitida, bloqueamos el acceso
    return usuario && rolesRequeridos.includes(usuario.role);
  }
}