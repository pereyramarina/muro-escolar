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

  // Este es el método que TypeScript no estaba encontrando
  async crearObra(datosObra: any) {
    const nuevaObra = this.obraRepository.create(datosObra);
    return await this.obraRepository.save(nuevaObra);
  }
}