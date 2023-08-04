import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user/schemas/user.schema';
import { UserController } from './entities/user/user.controller';
import { UserService } from './entities/user/user.service';
import { AuthController } from './entities/auth/auth.controller';
import { AuthService } from './entities/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './entities/auth/constants';
import { JwtStrategy } from './entities/auth/strategies/jwt.strategy';
import { LocalStrategy } from './entities/auth/auth.strategy';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
import { BookController } from './entities/book/book.controller';
import { BookService } from './entities/book/book.service';
import { BookSchema } from './entities/book/schemas/book.schema';
import { RentService } from './entities/rent/rent.service';
import { RentController } from './entities/rent/rent.controller';
import { RentSchema } from './entities/rent/schemas/rent.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/book-rent'),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Book', schema: BookSchema },
      { name: 'Rent', schema: RentSchema },
    ]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController, AuthController, BookController, RentController],
  providers: [
    UserService,
    AuthService,
    BookService,
    RentService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AppModule {}
