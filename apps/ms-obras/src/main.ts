import { NestFactory } from '@nestjs/core';
import { MsObrasModule } from './ms-obras.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MsObrasModule,
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 3001,
      },
    },
  );
  await app.listen();
  console.log('🎨 Microservicio de Obras (TCP) escuchando en puerto 3001');
}
bootstrap();