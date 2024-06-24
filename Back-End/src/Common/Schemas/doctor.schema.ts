import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  IsString,
  IsNumber,
  IsEmail,
  IsEnum,
  IsBoolean,
  ValidateNested,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
}

export class Address {
  @Prop({ required: true })
  @IsString()
  country: string;

  @Prop({ required: true })
  @IsString()
  city: string;

  @Prop({ required: true })
  @IsNumber()
  region: number;
}

@Schema()
export class Doctor extends Document {
  @Prop({ required: true })
  @IsString()
  name: string;

  @Prop({ required: true })
  @IsNumber()
  phone: number;

  @Prop({ required: true, unique: true })
  @IsEmail()
  email: string;

  @Prop({ required: true })
  @IsString()
  password: string;

  @Prop({ required: true })
  @ValidateNested()
  @Type(() => Address)
  address: Address;

  @Prop({ required: true })
  @IsString()
  image: string;

  @Prop({
    type: String,
    enum: Object.values(Gender),
    required: true,
  })
  @IsEnum(Gender)
  gender: Gender;

  @Prop({ type: Date, required: true })
  @IsDate()
  birthdate: Date;

  @Prop({ required: true })
  @IsBoolean()
  isDoctor: boolean;

  @Prop({ required: true })
  @IsString()
  genaralSpecialization: string;

  @Prop({ required: true })
  specializes: string[];

  @Prop({ default: 0 })
  @IsNumber()
  views: number;

  @Prop({ default: 0 })
  @IsNumber()
  fees: number;

  @Prop({ default: 0 })
  @IsNumber()
  waitingTime: number;

  @Prop({ required: true })
  @IsString()
  about: string;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
