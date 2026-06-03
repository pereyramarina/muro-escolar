import { NestFactory } from '@nestjs/core';
import { MsReportesModule } from './ms-reportes.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MsReportesModule,
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3003,
      },
    },
  );
  await app.listen();
  console.log('📊 Microservicio de Reportes (TCP) escuchando en puerto 3003');
}
bootstrap();