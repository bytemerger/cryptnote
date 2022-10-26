import { IsNumberString, IsOptional } from 'class-validator';

export class getAllQuery {
  @IsOptional()
  @IsNumberString()
  page: number;

  @IsOptional()
  @IsNumberString()
  perPage: number;
}
