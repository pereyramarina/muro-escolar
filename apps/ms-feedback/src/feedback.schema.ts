import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Crea campos automáticos de createdAt y updatedAt
export class Feedback extends Document {
  @Prop({ required: true })
  id_obra!: number;

  @Prop({ required: true })
  id_docente!: number;

  @Prop({ required: true })
  comentario_pedagogico!: string;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);