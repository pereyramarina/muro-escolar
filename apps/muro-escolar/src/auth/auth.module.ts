import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'CLAVE_SECRETA_SUPER_SEGURA_MURO_ESCOLAR',
      signOptions: { expiresIn: '8h' }, 
    }),
  ],
  controllers: [AuthController], // Agregamos el controlador aquí
  providers: [AuthService],      // Agregamos el servicio aquí
  exports: [JwtModule, AuthService],
})
export class AuthModule {}