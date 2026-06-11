import { IsNotEmpty, IsNumber, IsString, Min, Max } from 'class-validator';

export class CrearFeedbackDto {
  @IsNumber({}, { message: 'El ID de la obra debe ser un número.' })
  @IsNotEmpty({ message: 'Debes especificar a qué obra pertenece este feedback.' })
  id_obra!: number;

  @IsNumber({}, { message: 'La calificación debe ser un valor numérico.' })
  @Min(1, { message: 'La nota mínima permitida es 1.' })
  @Max(10, { message: 'La nota máxima permitida es 10.' })
  calificacion!: number;

  @IsString({ message: 'El comentario debe ser texto.' })
  @IsNotEmpty({ message: 'El comentario del docente es obligatorio.' })
  comentario!: string;
}