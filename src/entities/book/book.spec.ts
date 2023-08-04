import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { getModelToken } from '@nestjs/mongoose';
import { RentService } from '../rent/rent.service';
import { UpdateBookDto } from './dto/update-book.dto';
import { NotFoundException } from '@nestjs/common';

describe('BookService', () => {
  let bookService: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        RentService,
        { provide: getModelToken('Book'), useValue: jest.fn() },
        { provide: getModelToken('Rent'), useValue: jest.fn() },
      ],
    }).compile();

    bookService = module.get<BookService>(BookService);
  });

  describe('Book Success', () => {
    it('should create a book', async () => {
      const bookData = {
        title: 'Pai Rico Pai Pobre',
        description: 'Livro muito muito legal',
        publication_date: '20/11/1990',
      };

      const result: any = {
        title: 'Pai Rico Pai Pobre',
        description: 'Livro muito muito legal',
        publication_date: '20/11/1990',
        _id: '64cc6b80c362c41dc8cef943',
        __v: 0,
      };
      jest.spyOn(bookService, 'create').mockImplementation(() => result);

      expect(await bookService.create(bookData)).toBe(result);
    });

    it('should return an array of book', async () => {
      const result: any = [{ _id: '', title: '' }];
      jest.spyOn(bookService, 'findAll').mockImplementation(() => result);

      expect(await bookService.findAll()).toBe(result);
    });

    it('should return details of a book', async () => {
      const result: any = {
        title: 'Pai Rico Pai Pobre',
        description: 'Livro muito muito legal',
        publication_date: '20/11/1990',
        _id: '64cc6b80c362c41dc8cef943',
        __v: 0,
      };
      jest.spyOn(bookService, 'findOne').mockImplementation(() => result);

      expect(await bookService.findOne('64cc6b80c362c41dc8cef943')).toBe(
        result,
      );
    });

    it('should return update a book data', async () => {
      const payload: UpdateBookDto = {
        title: 'Pai Rico Pai Pobre',
        description: 'Livro informativo sobre finanças',
        publication_date: '01/11/1990',
      };

      const result: any = {
        _id: '64cc6b80c362c41dc8cef943',
        title: 'Pai Rico Pai Pobre',
        description: 'Livro informativo sobre finanças',
        publication_date: '01/11/1990',
        __v: 0,
      };

      jest.spyOn(bookService, 'update').mockImplementation(() => result);

      expect(
        await bookService.update('64cc6b80c362c41dc8cef943', payload),
      ).toBe(result);
    });

    it('should delete a book', async () => {
      const result: any = true;
      jest.spyOn(bookService, 'delete').mockImplementation(() => result);
      expect(await bookService.delete('64cc6b80c362c41dc8cef943')).toBe(true);
    });

    it('should return a error when trying to delete a book', async () => {
      const result: any = NotFoundException;
      jest.spyOn(bookService, 'delete').mockImplementation(() => result);
      expect(await bookService.delete('64cc6b80c362c41dc8cef43')).toBe(
        NotFoundException,
      );
    });
  });
});
