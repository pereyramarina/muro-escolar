import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MsReportesService } from './ms-reportes.service';

@Controller()
export class MsReportesController {
  constructor(private readonly msReportesService: MsReportesService) {}

  @MessagePattern('obtener_reporte_general')
  async handleObtenerReporte() {
    console.log('Generando payload analítico para visualización...');
    
    const estadisticas = await this.msReportesService.generarEstadisticasGenerales();
    
    // --- LÍNEA DE DIAGNÓSTICO AÑADIDA ---
    console.log('--- ESTRUCTURA DE DATOS PARA EL DASHBOARD ---');
    console.log(JSON.stringify(estadisticas, null, 2));
    // ------------------------------------
    
    return { status: 'Éxito', datos: estadisticas };
  }
}