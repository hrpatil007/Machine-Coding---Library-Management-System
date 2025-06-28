import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type BookDocument = HydratedDocument<Book>;

@Schema({ timestamps: true })
export class Book {
  @Prop({ type: String, default: uuidv4 })
  _id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true, unique: true })
  isbn: string;

  @Prop({ required: true })
  totalCopies: number;

  @Prop({ required: true })
  availableCopies: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);
