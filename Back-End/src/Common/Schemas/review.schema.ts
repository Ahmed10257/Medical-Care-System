import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { IsNumber, IsString } from 'class-validator';

@Schema()
export class Review extends Document {
  @Prop({ required: true, ref: 'Doctor' })
  doctor: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, ref: 'Patient' })
  patient: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  @IsNumber()
  rating: number;

  @Prop({ required: true })
  @IsString()
  review: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
