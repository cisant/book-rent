import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateRentDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;
  @IsString()
  @IsNotEmpty()
  book_id: string;
  @IsString()
  @IsOptional()
  start_date?: string;
  @IsString()
  @IsOptional()
  end_date?: string;
}
