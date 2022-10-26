import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PaginationService } from '../pagination/pagination.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { getAllQuery } from './dto/get-all-query.dto';
import { NoteIdParam } from './dto/note-id-param.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NotesService } from './notes.service';

@Controller('v1/notes')
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
  async createNote(@Body() createNoteDto: CreateNoteDto) {
    return await this.noteService.create(createNoteDto);
  }

  @Put('/:id')
  updateNote(@Param() param: NoteIdParam, @Body() updateNote: UpdateNoteDto) {
    return this.noteService.update(param.id, updateNote);
  }

  @Get('/:id/encrypted')
  getNoteEncrypted(@Param() param: NoteIdParam) {
    return this.noteService.getNoteEncrypted(param.id);
  }

  @Get('/:id/decrypted')
  getNoteDecrypted(@Param() param: NoteIdParam) {
    return this.noteService.getNoteDencrypted(param.id);
  }

  @Delete('/:id')
  async deleteNote(@Param() param: NoteIdParam) {
    await this.noteService.delete(param.id);
    return {
      message: 'deleted successfully',
    };
  }
}
