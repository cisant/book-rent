import bcrypt = require('bcryptjs');
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}
  async create(createUserDto: CreateUserDto): Promise<IUser> {
    try {
      const existingUser = await this.findByEmail(createUserDto.email);

      if (existingUser) {
        throw `There's already an user with this email`;
      }

      createUserDto.password = bcrypt.hashSync(createUserDto.password);
      const newUser = await new this.userModel(createUserDto);
      return newUser.save();
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }
}
