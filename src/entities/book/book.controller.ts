import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from '../auth/strategies/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Res() response, @Body() createBookDto: CreateBookDto) {
    try {
      const newBook = await this.bookService.create(createBookDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Book has been created successfully',
        result: newBook,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Book not created!',
        error: err || 'Bad Request',
      });
    }
  }

  @Get()
  async findAll(@Res() response) {
    try {
      const books = await this.bookService.findAll();
      return response.status(HttpStatus.OK).json({
        message: 'All books data found successfully',
        result: books,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get(':id')
  async findOne(@Res() response, @Param('id') id: string) {
    try {
      const book = await this.bookService.findOne(id);
      return response.status(HttpStatus.OK).json({
        message: 'Book data found successfully',
        result: book,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/search/:term')
  async search(@Res() response, @Param('term') term: string) {
    try {
      const books = await this.bookService.search(term);
      return response.status(HttpStatus.OK).json({
        message: 'Search returned Book data found successfully',
        result: books,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Patch(':id')
  async update(
    @Res() response,
    @Param('id') bookId: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    try {
      const existingBook = await this.bookService.update(bookId, updateBookDto);
      return response.status(HttpStatus.OK).json({
        message: 'Book has been successfully updated',
        existingBook,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') bookId: string) {
    try {
      const deletedBook = await this.bookService.delete(bookId);
      return response.status(HttpStatus.OK).json({
        message: 'Book deleted successfully',
        deletedBook,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
