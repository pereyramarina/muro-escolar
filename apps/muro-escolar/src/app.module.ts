import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD, APP_FILTER } from '@nestjs/core'; 
import { AppController } from './app.controller';
import { AllExceptionsFilter } from './http-exception.filter'; 
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Carga global de las variables de entorno
    ConfigModule.forRoot({
      isGlobal: true, 
    }),

    // Seguridad anti-DDoS (Rate Limiting)
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),

    // microservicios usando las variables dinámicas
    ClientsModule.registerAsync([
      {
        name: 'OBRAS_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('OBRAS_HOST'),
            port: configService.get<number>('OBRAS_PORT'),
          },
        }),
      },
      {
        name: 'FEEDBACK_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('FEEDBACK_HOST'),
            port: configService.get<number>('FEEDBACK_PORT'),
          },
        }),
      },
      {
        name: 'REPORTES_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('REPORTES_HOST'),
            port: configService.get<number>('REPORTES_PORT'),
          },
        }),
      },
    ]),

    AuthModule, // 2. CONECTAMOS EL MÓDULO AL SISTEMA PRINCIPAL
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    // Se activó el filtro global para atrapar caídas del servidor
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}