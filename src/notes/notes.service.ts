import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { CreateNoteDto } from './dto/create-note.dto';
import { Note, NoteDocument } from './schema/note.schema';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  async create(createNoteDto: CreateNoteDto): Promise<NoteDocument> {
    const createdNote = new this.noteModel(createNoteDto);
    return createdNote.save();
  }

  getAllModel(): Query<NoteDocument[], NoteDocument> {
    return this.noteModel.find({});
  }
}
