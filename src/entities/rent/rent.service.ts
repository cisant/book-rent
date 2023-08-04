import moment = require('moment');
import { Injectable } from '@nestjs/common';
import { CreateRentDto } from './dto/create-rent.dto';
import { IRent } from './interfaces/rent.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RentService {
  constructor(@InjectModel('Rent') private rentModel: Model<IRent>) {}
  async create(createRentDto: CreateRentDto) {
    const { book_id } = createRentDto;

    const currentRent = await this.findExistingRent(book_id);

    if (currentRent) {
      throw `This book is currently rented. Try another one`;
    }

    createRentDto.start_date = moment().format('DD/MM/YYYY');
    createRentDto.end_date = moment().add(3, 'days').format('DD/MM/YYYY');
    const newRent = await new this.rentModel(createRentDto);
    return newRent.save();
  }

  async findExistingRent(bookId: string) {
    return await this.rentModel.findOne({
      book_id: bookId,
      end_date: { $gt: moment().format('DD/MM/YYYY') },
    });
  }
}
