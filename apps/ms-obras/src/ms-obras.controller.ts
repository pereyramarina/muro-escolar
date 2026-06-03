import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MsObrasService } from './ms-obras.service';

@Controller()
export class MsObrasController {
  // Inyección de dependencias: conectamos el controlador con el servicio de base de datos
  constructor(private readonly msObrasService: MsObrasService) {}

  @MessagePattern('get_obras_test')
  handlePingObras(@Payload() data: any) {
    return { status: 'Éxito', respuesta: 'TCP funcionando.', datos: data };
  }

  // Interceptor TCP para procesar la creación de registros
  @MessagePattern('crear_obra')
  async handleCrearObra(@Payload() data: any) {
    console.log('Recibiendo datos para guardar en BD...', data);
    const obraGuardada = await this.msObrasService.crearObra(data);
    return { status: 'Éxito', obra: obraGuardada };
  }
}