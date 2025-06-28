import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type LoanDocument = HydratedDocument<Loan>;

@Schema({ timestamps: true })
export class Loan {
  @ApiProperty({
    example: '57e9d53f-8726-401e-90d6-1f5e5e6a962d',
    description: 'Primary ID for the loan record',
  })
  @Prop({ type: String, default: uuidv4 })
  _id: string;

  @ApiProperty({
    example: 'd42cba6f-e20a-4a2f-b785-43f75dcb2ab2',
    description: 'Loan ID (UUID) for tracking purposes',
  })
  @Prop({ type: String, default: uuidv4 })
  loanId: string;

  @ApiProperty({
    example: '9d5a732c-65ef-49a4-82df-1b1c9f176c49',
    description: 'User ID of the person borrowing the book',
  })
  @Prop({ required: true })
  userId: string;

  @ApiProperty({
    example: 'f35650aa-13b4-4032-a3a6-d7a0a22b7c7a',
    description: 'Book ID of the borrowed book',
  })
  @Prop({ required: true })
  bookId: string;

  @ApiProperty({
    example: '2025-06-15T10:00:00.000Z',
    description: 'Date and time when the book was borrowed',
  })
  @Prop({ default: Date.now })
  borrowDate: Date;

  @ApiProperty({
    example: '2025-06-20T10:00:00.000Z',
    description: 'Date and time when the book was returned (nullable)',
    required: false,
  })
  @Prop()
  returnDate?: Date;
}

export const LoanSchema = SchemaFactory.createForClass(Loan);
