import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MsObrasService } from './ms-obras.service';

@Controller()
export class MsObrasController {
  constructor(private readonly msObrasService: MsObrasService) {}

  @MessagePattern('get_obras_test')
  handlePingObras(@Payload() data: any) {
    return { status: 'Éxito', respuesta: 'TCP funcionando.', datos: data };
  }

  @MessagePattern('crear_obra')
  async handleCrearObra(@Payload() data: any) {
    const obraGuardada = await this.msObrasService.crearObra(data);
    return { status: 'Éxito', obra: obraGuardada };
  }

  // MÉTODO NUEVO: Intercepta la petición y llama al servicio
  @MessagePattern('obtener_obras')
  async handleObtenerObras() {
    console.log('Consultando todas las obras en BD...');
    const obras = await this.msObrasService.obtenerObras();
    return { status: 'Éxito', total: obras.length, datos: obras };
  }
}