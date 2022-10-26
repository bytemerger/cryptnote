import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { EncryptionService } from '../encryption/encryption.service';
import { NotesService } from './notes.service';
import { Note, NoteDocument } from './schema/note.schema';

describe('NotesService', () => {
  let service: NotesService;

  const mockEncryptionService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        {
          provide: EncryptionService,
          useValue: {},
        },
        {
          provide: getModelToken(Note.name),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<NotesService>(NotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
