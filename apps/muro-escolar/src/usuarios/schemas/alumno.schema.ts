import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Alumno extends Document {
  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string; 

  @Prop({ required: true })
  nombre!: string;

  @Prop({ required: true })
  apellido!: string;

  @Prop({ required: true, unique: true })
  dni!: string; 

  @Prop({ required: true, default: 'user' })
  role!: string; 
}

export const AlumnoSchema = SchemaFactory.createForClass(Alumno);