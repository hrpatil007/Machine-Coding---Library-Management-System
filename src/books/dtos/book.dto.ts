import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ example: 'Clean Code', description: 'Title of the book' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Robert C. Martin',
    description: 'Author of the book',
  })
  @IsNotEmpty()
  @IsString()
  author: string;

  @ApiProperty({
    example: '9780132350884',
    description: 'Unique ISBN of the book',
  })
  @IsNotEmpty()
  @IsString()
  isbn: string;

  @ApiProperty({ example: 5, description: 'Total number of copies available' })
  @IsInt()
  @Min(1)
  totalCopies: number;
}
