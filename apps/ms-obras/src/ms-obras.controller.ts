import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MsObrasService } from './ms-obras.service';
import { CrearObraDto } from './dto/crear-obra.dto';

@Controller()
export class MsObrasController {
  constructor(private readonly msObrasService: MsObrasService) {}

  @MessagePattern('get_obras_test')
  handlePingObras(@Payload() data: any) {
    return { status: 'Éxito', respuesta: 'TCP funcionando.', datos: data };
  }

  @MessagePattern('crear_obra')
  async handleCrearObra(@Payload() data: CrearObraDto) { 
    const obraGuardada = await this.msObrasService.crearObra(data);
    return { status: 'Éxito', obra: obraGuardada };
  }

  // Intercepta la petición y ahora también captura el parámetro de búsqueda
  @MessagePattern('obtener_obras')
  async handleObtenerObras(@Payload() data: { page?: number; limit?: number; search?: string }) {
    
    const page = data?.page ? Number(data.page) : 1;
    const limit = data?.limit ? Number(data.limit) : 10;
    const searchTerm = data?.search || ''; // Capturamos la palabra clave o enviamos un string vacío
    
    console.log(`Consultando obras en BD - Página: ${page}, Límite: ${limit}, Filtro: "${searchTerm}"`);
    
    // Solicitamos al servicio la información fragmentada y filtrada
    const resultado = await this.msObrasService.obtenerObras(page, limit, searchTerm);
    
    return { 
      status: 'Éxito', 
      total: resultado.total,
      paginasTotales: resultado.paginasTotales,
      paginaActual: page,
      datos: resultado.obras 
    };
  }
}