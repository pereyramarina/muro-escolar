import { Controller, Get, Post, Body, Inject, Query, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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
  @UseInterceptors(FileInterceptor('imagen', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const nombreUnico = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const extension = extname(file.originalname);
        cb(null, `${nombreUnico}${extension}`);
      }
    })
  }))
  crearNuevaObra(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any 
  ) {
    if (!file) throw new BadRequestException('La imagen es obligatoria');

    // Generamos la URL local para la imagen subida
    const urlGenerada = `http://localhost:3000/uploads/${file.filename}`;

    // Construimos el DTO exacto que espera el microservicio
    const payload = {
      titulo: body.titulo,
      descripcion: body.descripcion,
      alumnoId: body.alumnoId,
      imagenUrl: urlGenerada 
    };

    return this.clientObras.send('crear_obra', payload);
  }

  @Get('obras')
  obtenerTodasLasObras(
    @Query('page') page?: number,   
    @Query('limit') limit?: number, 
    @Query('search') search?: string
  ) {
    return this.clientObras.send('obtener_obras', { page, limit, search });
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