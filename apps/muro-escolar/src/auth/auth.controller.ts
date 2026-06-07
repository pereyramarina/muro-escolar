import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; dni: string }) {
    return await this.authService.validarUsuarioYGenerarToken(body.email, body.dni);
  }

  // EJEMPLO DE RUTA PROTEGIDA PARA DOCENTE (ADMIN)
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('subir-feedback')
  async subirFeedback() {
    return { mensaje: 'Solo el docente puede ver esto' };
  }

  // EJEMPLO DE RUTA PARA DIRECTIVO (VIEWER) - SOLO LECTURA
  @Roles('viewer', 'admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('ver-reportes')
  async verReportes() {
    return { mensaje: 'Acceso de lectura permitido' };
  }
}