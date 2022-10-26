import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { EncryptionService } from '../encryption/encryption.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note, NoteDocument } from './schema/note.schema';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name) private noteModel: Model<NoteDocument>,
    private encryptService: EncryptionService,
  ) {}

  async create(createNoteDto: CreateNoteDto): Promise<NoteDocument> {
    const encryptedNote = {
      note: this.encryptService.encrypt(createNoteDto.note),
    };

    const createdNote = new this.noteModel(encryptedNote);
    return createdNote.save();
  }

  getAllModel(): Query<NoteDocument[], NoteDocument> {
    return this.noteModel.find({});
  }

  async getNoteEncrypted(id: string) {
    const note = (await this.noteModel.findById(id)) ?? null;
    if (note) {
      return note;
    }
    throw new NotFoundException(`Note with id ${id} does not exist`);
  }

  async getNoteDencrypted(id: string) {
    const note = await this.noteModel.findById(id);
    if (note) {
      note.note = this.encryptService.decrypt(note.note);
      return note;
    }
    throw new NotFoundException(`Note with id ${id} does not exist`);
  }

  async update(id: string, note: UpdateNoteDto) {
    let insertNote = note.note;
    if (!note.encrypted) {
      insertNote = this.encryptService.encrypt(note.note);
    }
    const updated =
      (
        await this.noteModel.findByIdAndUpdate(
          id,
          { note: insertNote },
          { new: true },
        )
      )?.toJSON() ?? null;
    if (updated) return updated;
    throw new NotFoundException(`Note with id ${id} does not exist`);
  }

  async delete(id: string) {
    const exist = await this.noteModel.findById(id);
    if (exist) {
      return await this.noteModel.findByIdAndDelete(id);
    }
    throw new NotFoundException(`Note with id ${id} does not exist`);
  }
}
