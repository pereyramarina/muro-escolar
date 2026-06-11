import { Controller, Get, Post, Body, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CrearObraDto } from '../../ms-obras/src/dto/crear-obra.dto'; 

@Controller()
export class AppController {
  constructor(
    @Inject('OBRAS_SERVICE') private clientObras: ClientProxy,
    @Inject('FEEDBACK_SERVICE') private clientFeedback: ClientProxy,
    @Inject('REPORTES_SERVICE') private clientReportes: ClientProxy,
  ) {}

  // --- RUTA DE OBRAS ---
  @Get('ping-obras')
  pingMicroservicioObras() {
    return this.clientObras.send('get_obras_test', { mensaje: 'Hola!' });
  }

  @Post('obras')
  crearNuevaObra(@Body() body: CrearObraDto) {
    return this.clientObras.send('crear_obra', body);
  }

  @Get('obras')
  obtenerTodasLasObras(
    @Query('page') page?: number,   
    @Query('limit') limit?: number  
  ) {
    // Transmitimos el payload de paginación por TCP
    return this.clientObras.send('obtener_obras', { page, limit });
  }

  // --- RUTA DE FEEDBACK ---
  @Post('feedback')
  crearNuevoFeedback(@Body() body: any) {
    return this.clientFeedback.send('crear_feedback', body);
  }

  @Get('feedback')
  obtenerTodosLosFeedbacks() {
    return this.clientFeedback.send('obtener_feedbacks', {});
  }

  // --- RUTA DE REPORTES ---
  @Get('reportes')
  obtenerReporteEstadistico() {
    return this.clientReportes.send('obtener_reporte_general', {});
  }
}