import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MsObrasService } from './ms-obras.service';
import { CrearObraDto } from './dto/crear-obra.dto'; // 1. Importamos el DTO de validación

@Controller()
export class MsObrasController {
  constructor(private readonly msObrasService: MsObrasService) {}

  @MessagePattern('get_obras_test')
  handlePingObras(@Payload() data: any) {
    return { status: 'Éxito', respuesta: 'TCP funcionando.', datos: data };
  }

  @MessagePattern('crear_obra')
  async handleCrearObra(@Payload() data: CrearObraDto) { // 2. Aplicamos la aduana estricta
    const obraGuardada = await this.msObrasService.crearObra(data);
    return { status: 'Éxito', obra: obraGuardada };
  }

  
  @MessagePattern('obtener_obras')
  async handleObtenerObras(@Payload() data: { page?: number; limit?: number }) {
    
    const page = data?.page ? Number(data.page) : 1;
    const limit = data?.limit ? Number(data.limit) : 10;
    
    console.log(`Consultando obras en BD - Página: ${page}, Límite: ${limit}...`);
    
    // Solicitamos al servicio la información fragmentada
    const resultado = await this.msObrasService.obtenerObras(page, limit);
    
    return { 
      status: 'Éxito', 
      total: resultado.total,
      paginasTotales: resultado.paginasTotales,
      paginaActual: page,
      datos: resultado.obras 
    };
  }
}