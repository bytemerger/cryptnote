import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('notes')
export class NotesController {

    @Get()
    getAll(): string {
        return 'This is the get all route'
    }

    @Post()
    createNote(): string {
        return 'This is the get all route'
    }

    @Put('/:id')
    updateNote(): string {
        return 'This is the get all route'
    }

    @Delete('/:id')
    deleteNote(): string {
        return 'This is the get all route'
    }
}
