import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('feedback')
export class Feedback {
  @PrimaryGeneratedColumn()
  id_feedback!: number;

  @Column()
  id_obra!: number;

  @Column()
  id_docente!: number;

  @Column()
  calificacion!: number;

  @Column('text')
  comentario!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha!: Date;
}