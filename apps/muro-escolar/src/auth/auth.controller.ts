import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; dni: string }) {
    return await this.authService.validarUsuarioYGenerarToken(body.email, body.dni);
  }

  // ENDPOINT DE PROVISIONAMIENTO (Solo accesible por Directivos)
  @Roles('directivo')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('registrar')
  async registrar(@Body() crearUsuarioDto: CrearUsuarioDto) {
    return await this.authService.registrarUsuario(crearUsuarioDto);
  }

  // RUTA PROTEGIDA PARA DOCENTES
  @Roles('docente')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('subir-feedback')
  async subirFeedback() {
    return { mensaje: 'Acceso exclusivo: Módulo de evaluación docente activo.' };
  }

  // RUTA PROTEGIDA PARA DIRECTIVOS (Reportes)
  @Roles('directivo')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('ver-reportes')
  async verReportes() {
    return { mensaje: 'Acceso de lectura permitido para auditoría directiva.' };
  }
}