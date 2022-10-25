import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [NotesModule, MongooseModule.forRoot('mongodb://localhost/sp')],
})
export class AppModule {}
