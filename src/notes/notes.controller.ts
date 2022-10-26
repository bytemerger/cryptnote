import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PaginationService } from 'src/pagination/pagination.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { getAllQuery } from './dto/get-all-query.dto';
import { NotesService } from './notes.service';
import { Note, NoteDocument } from './schema/note.schema';

@Controller('notes')
export class NotesController {
  constructor(
    private noteService: NotesService,
    private readonly paginateService: PaginationService,
  ) {}
  @Get()
  async getAll(@Query() query: getAllQuery) {
    const { page, perPage } = query;
    const totalCount = await this.noteService.getAllModel().countDocuments();
    return this.paginateService.paginate(
      this.noteService.getAllModel(),
      totalCount,
      page,
      perPage,
    );
  }

  @Post()
  async createNote(
    @Body() createNoteDto: CreateNoteDto,
  ): Promise<NoteDocument> {
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
