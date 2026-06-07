import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validarUsuarioYGenerarToken(email: string, dniIngresado: string) {
    // Simulación del usuario que luego conectaremos a tu esquema Alumno en MongoDB
    const usuarioEncontrado = {
      email: email,
      passwordHash: await bcrypt.hash(dniIngresado, 10), 
      role: 'user', 
      nombre: 'Usuario',
      apellido: 'Prueba'
    };

    if (!usuarioEncontrado) {
      throw new UnauthorizedException('El correo no está registrado.');
    }

    // 1. Verificamos que el DNI ingresado coincida con el encriptado
    const contrasenaValida = await bcrypt.compare(dniIngresado, usuarioEncontrado.passwordHash);

    if (!contrasenaValida) {
      throw new UnauthorizedException('DNI incorrecto.');
    }

    // 2. Creamos el "Pase de Visitante" (El payload del JWT)
    const payload = { 
      email: usuarioEncontrado.email, 
      role: usuarioEncontrado.role,
      nombre: usuarioEncontrado.nombre
    };

    // 3. Devolvemos el Token firmado al Frontend
    return {
      access_token: this.jwtService.sign(payload),
      perfil: {
        nombre: usuarioEncontrado.nombre,
        apellido: usuarioEncontrado.apellido,
        role: usuarioEncontrado.role
      }
    };
  }
}