import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BorrowDto {
  @ApiProperty({
    example: '9d5a732c-65ef-49a4-82df-1b1c9f176c49',
    description: 'The ID of the user borrowing the book',
  })
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example: 'f35650aa-13b4-4032-a3a6-d7a0a22b7c7a',
    description: 'The ID of the book being borrowed',
  })
  @IsNotEmpty()
  bookId: string;
}
