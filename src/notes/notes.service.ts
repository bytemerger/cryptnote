import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Query } from 'mongoose';
import { EncryptionService } from 'src/encryption/encryption.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { Note, NoteDocument } from './schema/note.schema';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>, private encryptService: EncryptionService) {}

  async create(createNoteDto: CreateNoteDto): Promise<NoteDocument> {

    const encryptedNote = {
      note: this.encryptService.encrypt(createNoteDto.note)
    }

    const createdNote = new this.noteModel(encryptedNote);
    return createdNote.save();
  }

  getAllModel(): Query<NoteDocument[], NoteDocument> {
    return this.noteModel.find({});
  }

  async update(id: ObjectId, note: CreateNoteDto) {
    const updated =
      (
        await this.noteModel.findByIdAndUpdate(id, note, { new: true })
      )?.toJSON() ?? null;
    if (updated) return updated;
    throw new NotFoundException(`Note with id ${id} does not exist`);
  }

  async delete(id: ObjectId) {
    const exist = await this.noteModel.findById(id);
    if (exist) {
      return await this.noteModel.findByIdAndDelete(id);
    }
    throw new NotFoundException(`Note with id ${id} does not exist`);
  }
}
