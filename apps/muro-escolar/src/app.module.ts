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
    ConfigModule.forRoot({ isGlobal: true }),

    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),

    ClientsModule.registerAsync([
      {
        name: 'OBRAS_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('OBRAS_HOST') || '127.0.0.1',
            port: configService.get<number>('OBRAS_PORT') || 3001,
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
            host: configService.get<string>('FEEDBACK_HOST') || '127.0.0.1',
            port: configService.get<number>('FEEDBACK_PORT') || 3002,
          },
        }),
      },
      {
        name: 'REPORTES_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const host = configService.get<string>('REPORTES_HOST');
          const port = configService.get<number>('REPORTES_PORT');
          
          // Si no hay configuración válida, devolvemos un puerto ficticio para evitar error 500
          if (!host || !port) {
            console.warn('⚠️ Microservicio Reportes no detectado, modo seguro activo.');
            return { transport: Transport.TCP, options: { host: '127.0.0.1', port: 9999 } };
          }
          return { transport: Transport.TCP, options: { host, port } };
        },
      },
    ]),

    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})
export class AppModule {}