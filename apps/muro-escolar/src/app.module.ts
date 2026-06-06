import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';

@Module({
  imports: [
    // Configuración de Rate Limiting: Máximo 10 peticiones cada (1 minuto) por IP
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    ClientsModule.register([
      {
        name: 'OBRAS_SERVICE',
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: 3001 },
      },
      {
        name: 'FEEDBACK_SERVICE',
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: 3002 },
      },
      {
        name: 'REPORTES_SERVICE',
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: 3003 },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    {
      // Aplica la protección DDoS de forma global a todas las rutas del Gateway
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}