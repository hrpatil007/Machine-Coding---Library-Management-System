import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @ApiProperty({
    example: 'c4176cbb-df43-4f13-9c65-4c6422349eaa',
    description: 'Unique identifier for the user',
  })
  @Prop({
    type: String,
    default: uuidv4,
  })
  _id: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the user',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address of the user',
  })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({
    example: '2025-06-15T12:00:00.000Z',
    description: 'Date when the user registered',
  })
  @Prop({ default: Date.now })
  membershipDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
