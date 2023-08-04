import { Document } from 'mongoose';

export interface IBook extends Document {
  _id: string;
  title: string;
  description: string;
  publication_date: string;
}
