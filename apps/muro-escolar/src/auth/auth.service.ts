import { Injectable, UnauthorizedException, ConflictException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private usuariosSimulados: any[] = [
    { id: 1, email: 'alumno@gmail.com', passwordHash: '', role: 'alumno', nombre: 'Mercedes', apellido: 'Marina' },
    { id: 2, email: 'docente@gmail.com', passwordHash: '', role: 'docente', nombre: 'Carlos', apellido: 'Pereyra' },
    { id: 3, email: 'directivo@gmail.com', passwordHash: '', role: 'directivo', nombre: 'Dirección', apellido: 'General' }
  ];

  constructor(private jwtService: JwtService) {
    this.precargarHashes();
  }

  private async precargarHashes() {
    try {
      this.usuariosSimulados[0].passwordHash = await bcrypt.hash('12345678', 10);
      this.usuariosSimulados[1].passwordHash = await bcrypt.hash('87654321', 10);
      this.usuariosSimulados[2].passwordHash = await bcrypt.hash('11223344', 10);
    } catch (e) {
      console.error('Error inicializando hashes:', e);
    }
  }

  async validarUsuarioYGenerarToken(email: string, dniIngresado: string) {
    const usuarioEncontrado = this.usuariosSimulados.find(u => u.email === email);
    if (!usuarioEncontrado) throw new UnauthorizedException('El correo electrónico no está registrado.');

    const contrasenaValida = await bcrypt.compare(dniIngresado, usuarioEncontrado.passwordHash);
    if (!contrasenaValida) throw new UnauthorizedException('DNI incorrecto.');

    const payload = { 
      sub: usuarioEncontrado.id, 
      email: usuarioEncontrado.email, 
      role: usuarioEncontrado.role,
      nombre: usuarioEncontrado.nombre
    };

    return {
      access_token: this.jwtService.sign(payload),
      perfil: {
        id: usuarioEncontrado.id,
        nombre: usuarioEncontrado.nombre,
        apellido: usuarioEncontrado.apellido,
        role: usuarioEncontrado.role
      }
    };
  }

  async registrarUsuario(dto: CrearUsuarioDto) {
    console.log('--- BACKEND RECIBIENDO REGISTRO ---', JSON.stringify(dto));

    try {
      if (!dto.email || !dto.dni) {
        throw new BadRequestException('Datos insuficientes.');
      }

      const existe = this.usuariosSimulados.find(u => u.email === dto.email);
      if (existe) throw new ConflictException('El correo ya está registrado.');

      const passwordHash = await bcrypt.hash(dto.dni, 10);
      
      const nuevoId = this.usuariosSimulados.length > 0 
        ? Math.max(...this.usuariosSimulados.map(u => u.id)) + 1 
        : 1;

      const nuevoUsuario = {
        id: nuevoId,
        email: dto.email,
        passwordHash: passwordHash,
        role: dto.role,
        nombre: dto.nombre,
        apellido: dto.apellido
      };

      this.usuariosSimulados.push(nuevoUsuario);
      console.log('--- USUARIO REGISTRADO EXITOSAMENTE ---');
      
      return { 
        mensaje: 'Usuario registrado con éxito.', 
        usuario: { 
          id: nuevoUsuario.id,
          email: nuevoUsuario.email, 
          role: nuevoUsuario.role, 
          nombre: nuevoUsuario.nombre, 
          apellido: nuevoUsuario.apellido 
        } 
      };
    } catch (error: any) {
      console.error('--- ERROR CRÍTICO EN REGISTRO ---', error);
      if (error instanceof ConflictException || error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error interno: ' + (error?.message || 'Desconocido'));
    }
  }
}