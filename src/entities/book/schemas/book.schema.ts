import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Book {
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  publication_date: string;
}
export const BookSchema = SchemaFactory.createForClass(Book);
