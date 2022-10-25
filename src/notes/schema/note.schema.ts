import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NoteDocument = Note & Document;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Note {
  @Prop({ required: true })
  note!: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const NoteSchema = SchemaFactory.createForClass(Note);