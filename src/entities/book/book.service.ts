import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { IBook } from './interfaces/book.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { isValid } from '../../utils/date';
import { RentService } from '../rent/rent.service';
import { IRent } from '../rent/interfaces/rent.interface';

@Injectable()
export class BookService {
  constructor(
    @InjectModel('Book') private bookModel: Model<IBook>,
    @Inject(RentService)
    private readonly rentService: RentService,
  ) {}
  async create(createBookDto: CreateBookDto): Promise<IBook> {
    try {
      const existingBook: IBook = await this.findByTitle(createBookDto.title);

      if (existingBook) {
        throw `There's already an book with this title`;
      }

      const dateIsValid: boolean = isValid(createBookDto.publication_date);

      if (!dateIsValid) {
        throw 'Invalid date. Try again!';
      }

      const newBook: IBook = await new this.bookModel(createBookDto);
      return newBook.save();
    } catch (error) {
      throw error;
    }
  }

  async findByTitle(title: string): Promise<IBook> {
    return await this.bookModel.findOne({ title });
  }

  async findAll() {
    const books: IBook[] = await this.bookModel.find();
    if (!books || books.length == 0) {
      throw new NotFoundException('Books data not found!');
    }
    const mappedBooks = books.map((book: IBook) => {
      const { _id, title } = book;
      return {
        _id,
        title,
      };
    });
    return mappedBooks;
  }

  async findOne(id: string): Promise<IBook> {
    const book: IBook = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException('Book not found!');
    }
    return book;
  }

  async search(term: string) {
    const books: IBook[] = await this.bookModel.find({
      $or: [
        { title: { $regex: new RegExp(term, 'i') } },
        { description: { $regex: new RegExp(term, 'i') } },
        { publication_date: term },
      ],
    });
    if (!books || books.length == 0) {
      throw new NotFoundException(`Search couldn't find books!`);
    }
    return books;
  }

  async update(bookId: string, updateBookDto: UpdateBookDto) {
    const existingRent: IRent = await this.rentService.findExistingRent(bookId);

    if (existingRent) {
      throw new ConflictException(
        `There's a current rent for this book. You can't update it.`,
      );
    }

    const existingBook: IBook = await this.bookModel.findByIdAndUpdate(
      bookId,
      updateBookDto,
      { new: true },
    );

    if (!existingBook) {
      throw new NotFoundException(`Book #${bookId} not found`);
    }
    return existingBook;
  }

  async delete(bookId: string): Promise<boolean> {
    const existingRent: IRent = await this.rentService.findExistingRent(bookId);

    if (existingRent) {
      throw new ConflictException(
        `There's a current rent for this book. You can't delete it.`,
      );
    }

    const bookToDelete: IBook = await this.bookModel.findByIdAndDelete(bookId);
    if (!bookToDelete) {
      throw new NotFoundException(`Book #${bookId} not found`);
    }
    return true;
  }
}
