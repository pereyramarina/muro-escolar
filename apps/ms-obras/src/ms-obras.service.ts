import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Obra } from './obra.entity';

@Injectable()
export class MsObrasService {
  constructor(
    @InjectRepository(Obra)
    private obraRepository: Repository<Obra>,
  ) {}

  async crearObra(datosObra: any) {
    const nuevaObra = this.obraRepository.create(datosObra);
    return await this.obraRepository.save(nuevaObra);
  }

  /**
   * Ejecuta un SELECT paginado en la base de datos usando Skip y Take
   */
  async obtenerObras(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [obras, total] = await this.obraRepository.findAndCount({
      skip: skip,      
      take: limit,     
      order: {
        id_obra: 'DESC'
      }
    });

    const paginasTotales = Math.ceil(total / limit);

    return {
      obras,
      total,
      paginasTotales,
    };
  }
}