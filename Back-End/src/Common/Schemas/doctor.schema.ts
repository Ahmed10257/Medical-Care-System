/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import {
  IsString,
  IsNumber,
  IsEmail,
  IsEnum,
  IsBoolean,
  ValidateNested,
  IsDate,
} from 'class-validator';
import {Type } from 'class-transformer';
export type DoctorDocument = HydratedDocument<Doctor>;

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
  specialization: string;

}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);