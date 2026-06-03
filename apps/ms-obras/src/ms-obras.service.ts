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

  // MÉTODO NUEVO: Ejecuta un SELECT en la base de datos
  async obtenerObras() {
    return await this.obraRepository.find();
  }
}