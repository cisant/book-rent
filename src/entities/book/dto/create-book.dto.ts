import { IsNotEmpty, IsString } from 'class-validator';
export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsString()
  @IsNotEmpty()
  publication_date: string;
}
