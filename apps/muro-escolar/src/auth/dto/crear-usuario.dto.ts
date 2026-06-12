import { IsEmail, IsString, MinLength, IsIn, IsNotEmpty } from 'class-validator';

export class CrearUsuarioDto {
  @IsEmail({}, { message: 'Debe proporcionar un correo válido' })
  @IsNotEmpty({ message: 'El correo es obligatorio' })
  email!: string;

  @IsString()
  @MinLength(7, { message: 'El DNI debe tener al menos 7 caracteres' })
  @IsNotEmpty({ message: 'El DNI es obligatorio' })
  dni!: string;

  @IsString()
  @IsIn(['alumno', 'docente', 'directivo'], { message: 'El rol no es válido' })
  @IsNotEmpty({ message: 'El rol es obligatorio' })
  role!: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombre!: string;

  @IsString()
  @IsNotEmpty({ message: 'El apellido es obligatorio' })
  apellido!: string;
}