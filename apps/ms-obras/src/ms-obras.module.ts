import { Module } from '@nestjs/common';
import { MsObrasController } from './ms-obras.controller';
import { MsObrasService } from './ms-obras.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Obra } from './obra.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'root',
      password: 'password123',
      database: 'muro_escolar_db',
      autoLoadEntities: true,
      synchronize: true, // Esto creará la tabla 'obras' automáticamente ahora mismo
    }),
    // Registramos la entidad aquí
    TypeOrmModule.forFeature([Obra]),
  ],
  controllers: [MsObrasController],
  providers: [MsObrasService],
})
export class MsObrasModule {}