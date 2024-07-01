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
import { Type } from 'class-transformer';
export type DoctorDocument = HydratedDocument<Doctor>;

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
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

export class Clinic {
  @Prop({ required: true })
  @IsString()
  street: string;

  @Prop({ required: true })
  @IsString()
  building: string;
}

@Schema()
export class Doctor extends Document {
  @Prop({ required: true })
  // @IsString()
  firstName: string;

  @Prop({ required: true })
  // @IsString()
  lastName: string;

  @Prop({ required: true })
  // @IsString()
  phone: string;

  @Prop({ required: true, unique: true })
  // @IsEmail()
  email: string;

  @Prop({ required: true })
  @IsString()
  password: string;

  // @Prop({ required: true })
  // @ValidateNested()
  // @Type(() => Address)
  address: Address;

  @Prop({ required: true })
  // @IsString()
  image: string;

  // @Prop({
  //   type: String,
  //   enum: Object.values(Gender),
  //   required: true,
  // })
  // @IsEnum(Gender)
  gender: Gender;

  @Prop({ type: Date, required: true })
  @IsDate()
  birthdate: Date;

  @Prop({ default: true })
  @IsBoolean()
  isDoctor: boolean;

  @Prop({ required: false, default: ''})
  // @IsString()
  genaralSpecialization: string;

  @Prop({ required: false, default: 0 })
  // @IsNumber()
  fees: number;

  @Prop({ required: false, default: 0})
  // @IsNumber()
  waitingTime: number;

  @Prop({ required: true })
  specializes: string[];

  @Prop({ default: 0 })
  @IsNumber()
  views: number;

  @Prop({ required: false, default: '' })
  // @IsString()
  about: string;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
