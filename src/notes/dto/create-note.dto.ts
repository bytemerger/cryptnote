import { IsNotEmpty, Length, max, min } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  @Length(5, 500)
  note: string;
}
