import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { NotesService } from './notes.service';
import { Note, NoteDocument } from './schema/note.schema';

@Controller('notes')
export class NotesController {
  constructor(private noteService: NotesService) {}
  @Get()
  getAll(): string {
    return 'This is the get all route';
  }

  @Post()
  async createNote(@Body() createNoteDto: CreateNoteDto): Promise<NoteDocument> {
    return await this.noteService.create(createNoteDto);
  }

  @Put('/:id')
  updateNote(): string {
    return 'This is the get all route';
  }

  @Delete('/:id')
  deleteNote(): string {
    return 'This is the get all route';
  }
}
