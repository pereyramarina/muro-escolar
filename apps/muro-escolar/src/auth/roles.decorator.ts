import { SetMetadata } from '@nestjs/common';

// Este decorador nos permite marcar rutas como: @Roles('admin')
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);