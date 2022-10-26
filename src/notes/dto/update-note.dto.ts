import { IsBoolean, IsNotEmpty, Length } from 'class-validator';

export class UpdateNoteDto {
  @IsNotEmpty()
  @Length(5, 500)
  note: string;

  @IsNotEmpty()
  @IsBoolean()
  encrypted: boolean;
}
