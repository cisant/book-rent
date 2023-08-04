import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Rent {
  @Prop()
  user_id: string;
  @Prop()
  book_id: string;
  @Prop()
  start_date: string;
  @Prop()
  end_date: string;
}
export const RentSchema = SchemaFactory.createForClass(Rent);
