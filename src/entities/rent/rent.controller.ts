import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Res,
  UseGuards,
} from '@nestjs/common';
import { RentService } from './rent.service';
import { CreateRentDto } from './dto/create-rent.dto';
import { JwtAuthGuard } from '../auth/strategies/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('rent')
export class RentController {
  constructor(private readonly rentService: RentService) {}

  @Post()
  async create(@Res() response, @Body() createRentDto: CreateRentDto) {
    try {
      const newRent = await this.rentService.create(createRentDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Rent was registered successfully',
        result: newRent,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Rent not registered!',
        error: err || 'Bad Request',
      });
    }
  }
}
