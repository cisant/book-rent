import { Document } from 'mongoose';

export interface IRent extends Document {
  _id: string;
  user_id: string;
  book_id: string;
  start_date: string;
  end_date: string;
}
