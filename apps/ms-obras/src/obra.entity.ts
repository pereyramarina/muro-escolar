import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('obras') // Nombre de la tabla en la base de datos
export class Obra {
  @PrimaryGeneratedColumn()
  id_obra!: number;

  @Column()
  id_docente!: number;

  @Column()
  id_alumno!: number;

  @Column()
  titulo!: string;

  @Column()
  tecnica!: string;

  @Column()
  url_imagen!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha!: Date;
}