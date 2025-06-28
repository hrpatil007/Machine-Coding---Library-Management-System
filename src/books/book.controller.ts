import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dtos/book.dto';
import { UpdateBookDto } from './dtos/books.update.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { Book } from './entities/books.entity';

@ApiTags('Books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new book' })
  @ApiBody({ type: CreateBookDto })
  @ApiResponse({ status: 201, description: 'Book created', type: Book })
  create(@Body() dto: CreateBookDto) {
    return this.bookService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all books' })
  @ApiResponse({ status: 200, description: 'List of books', type: [Book] })
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get book by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the book' })
  @ApiResponse({ status: 200, description: 'Book found', type: Book })
  findById(@Param('id') id: string) {
    return this.bookService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update book by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the book' })
  @ApiBody({ type: UpdateBookDto })
  @ApiResponse({ status: 200, description: 'Book updated', type: Book })
  update(@Param('id') id: string, @Body() dto: UpdateBookDto) {
    return this.bookService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete book by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the book' })
  @ApiResponse({ status: 204, description: 'Book deleted' })
  remove(@Param('id') id: string) {
    return this.bookService.delete(id);
  }
}
