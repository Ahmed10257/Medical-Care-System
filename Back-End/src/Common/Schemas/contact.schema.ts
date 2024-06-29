import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContactDocument = Contact & Document;

@Schema()
export class Contact {
  @Prop({
    required: [true, 'Name is required'],
    type: String,
    minlength: [3, 'Name must be at least 3 characters long'],
    maxlength: [50, 'Name must be less than 50 characters long'],
  })
  name: string;

  @Prop({
    required: [true, 'Mobile is required'],
    type: String,
    match: [
      /^\d{10,15}$/,
      'Mobile must be a valid phone number with 10 to 15 digits',
    ],
  })
  mobile: string;

  @Prop({
    required: [true, 'Email is required'],
    type: String,
    match: [/^\S+@\S+\.\S+$/, 'Email must be a valid email address'],
  })
  email: string;

  @Prop({
    required: [true, 'Comments are required'],
    type: String,
    minlength: [10, 'Comments must be at least 10 characters long'],
    maxlength: [500, 'Comments must be less than 500 characters long'],
  })
  comments: string;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;

  @Prop({
    type: String,
    default: '',
  })
  status: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
