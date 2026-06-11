import { IsNotEmpty, IsString, IsUrl, MinLength } from 'class-validator';

export class CrearObraDto {
  @IsString({ message: 'El título debe ser una cadena de texto válida.' })
  @IsNotEmpty({ message: 'El título de la obra es obligatorio.' })
  @MinLength(3, { message: 'El título de la obra debe tener al menos 3 caracteres.' })
  titulo!: string;

  @IsString({ message: 'La descripción debe ser una cadena de texto válida.' })
  @IsNotEmpty({ message: 'La descripción o técnica es obligatoria.' })
  descripcion!: string;

  @IsUrl({}, { message: 'La propiedad imagenUrl debe ser un enlace HTTP/HTTPS válido.' })
  @IsNotEmpty({ message: 'La URL de la imagen es obligatoria.' })
  imagenUrl!: string;

  @IsString({ message: 'El ID del alumno debe ser un formato de texto válido.' })
  @IsNotEmpty({ message: 'El ID o Legajo del alumno es obligatorio.' })
  alumnoId!: string;
}