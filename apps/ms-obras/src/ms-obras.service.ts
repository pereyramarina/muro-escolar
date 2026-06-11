import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Obra } from './obra.entity';

@Injectable()
export class MsObrasService {
  constructor(
    @InjectRepository(Obra)
    private obraRepository: Repository<Obra>,
  ) {}

  async crearObra(datosObra: any) {
    const nuevaObra = this.obraRepository.create({
      titulo: datosObra.titulo,
      tecnica: datosObra.descripcion,        
      url_imagen: datosObra.imagenUrl,       
      id_alumno: Number(datosObra.alumnoId),
      id_docente: 1
    });
    const obraGuardada = await this.obraRepository.save(nuevaObra);

    return obraGuardada;
  }

  async obtenerObras(page: number, limit: number, searchTerm: string = '') {
    const skip = (page - 1) * limit;

    const whereClause: any[] = [];

    if (searchTerm) {
      // Buscamos coincidencias de texto en 'titulo' y 'tecnica'
      whereClause.push({ titulo: Like(`%${searchTerm}%`) });
      whereClause.push({ tecnica: Like(`%${searchTerm}%`) });

      if (!isNaN(Number(searchTerm))) {
        whereClause.push({ id_alumno: Number(searchTerm) });
      }
    }

    const condicionWhere = whereClause.length > 0 ? whereClause : {};

    const [obrasBd, total] = await this.obraRepository.findAndCount({
      where: condicionWhere,
      skip: skip,      
      take: limit,     
      order: {
        id_obra: 'DESC' 
      }
    });

    
    const obrasFrontend = obrasBd.map(obra => ({
      id_obra: obra.id_obra,
      titulo: obra.titulo,
      descripcion: obra.tecnica,             
      imagenUrl: obra.url_imagen,            
      alumnoId: obra.id_alumno.toString(),   
      fecha: obra.fecha
    }));

    const paginasTotales = Math.ceil(total / limit) || 1;

    return {
      obras: obrasFrontend,
      total,
      paginasTotales,
    };
  }
}