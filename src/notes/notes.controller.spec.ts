import { Test, TestingModule } from '@nestjs/testing';
import { ObjectId, Types } from 'mongoose';
import { PaginationService } from '../pagination/pagination.service';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';

describe('NotesController', () => {
  let controller: NotesController;

  const mockNotesservice = {
    create: jest.fn((dto) => {
      return {
        id: Math.random(),
        ...dto,
      };
    }),
    getAllModel: () => ({
      countDocuments: jest.fn(() => 8),
    }),
    update: jest.fn((id, dto) => {
      delete dto.encrypted;
      return {
        id,
        ...dto,
      };
    }),
    delete: jest.fn((id) => {
      return true;
    }),
  };

  const mockPaginationService = {
    paginate: jest.fn(() => ({
      data: [],
      pagination: {
        currentPage: 1,
        numberOfpages: 1,
        total: 1,
      },
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [
        { provide: NotesService, useValue: mockNotesservice },
        PaginationService,
      ],
    })
      .overrideProvider(PaginationService)
      .useValue(mockPaginationService)
      .compile();

    controller = module.get<NotesController>(NotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should create a Note', async () => {
    const note = {
      note: 'string of',
    };
    expect(await controller.createNote(note)).toEqual({
      id: expect.any(Number),
      ...note,
    });
    expect(mockNotesservice.create).toHaveBeenCalledWith(note);
  });

  it('Should Get all Notes', async () => {
    expect(await controller.getAll({ page: 1, perPage: 2 })).toHaveProperty(
      'data',
      [],
    );
    expect(await controller.getAll({ page: 1, perPage: 2 })).toHaveProperty(
      'pagination.currentPage',
      1,
    );
    expect(mockPaginationService.paginate).toHaveBeenCalledTimes(2);
  });

  it('Should update Note', async () => {
    const id = '635923f4129681c220b794ca';
    expect(
      await controller.updateNote({ id }, { note: 'check', encrypted: false }),
    ).toHaveProperty('id', id);
    expect(
      await controller.updateNote({ id }, { note: 'check', encrypted: false }),
    ).not.toHaveProperty('encrypted');
    expect(mockNotesservice.update).toHaveBeenCalledTimes(2);
  });

  it('Should Delete Note', async () => {
    const id = '635923f4129681c220b794ca';
    expect(await controller.deleteNote({ id }));
    expect(mockNotesservice.delete).toHaveBeenCalledTimes(1);
  });
});
