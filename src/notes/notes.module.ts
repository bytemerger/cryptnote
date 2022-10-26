import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesController } from './notes.controller';
import { Note, NoteDocument, NoteSchema } from './schema/note.schema';
import { NotesService } from './notes.service';
import { PaginationService } from '../pagination/pagination.service';
import { EncryptionService } from '../encryption/encryption.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Note.name,
        useFactory: () => {
          const schema = NoteSchema;
          schema.set('toJSON', {
            transform: function (_doc, ret: NoteDocument) {
              ret.id = ret._id;
              delete ret._id;
              delete ret.__v;
            },
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [NotesController],
  providers: [NotesService, PaginationService, EncryptionService],
})
export class NotesModule {}
