/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import {
  ArrayMinSize,
  IsDate,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export type PatientDocument = HydratedDocument<Patient>;

enum Gender {
  Male = 'male',
  Female = 'female',
}

@Schema()
export class Address {
  @IsString()
  @Prop({ type: String })
  city: string;

  @IsString()
  @Prop({ type: String })
  street: string;

  @IsString()
  @Prop({ type: String })
  country: string;
}

@Schema()
export class Patient {
  toObject(): { [x: string]: any; password: any } {
    throw new Error('Method not implemented.');
  }
  @IsString()
  @Prop({ required: true })
  name: string;

  @IsNumber()
  @Prop({ required: false, default: 18 })
  age: number;

  @IsString()
  @Prop({ required: true })
  phone: string;

  @IsString()
  @Prop({ required: true, unique: true })
  email: string;

  @IsString()
  @Prop({ required: true })
  password: string;

  @ValidateNested({ each: true })
  @Type(() => Address)
  @ArrayMinSize(1)
  @Prop({
    type: [Address],
    required: true,
    default: [
      {
        city: 'Cairo',
        street: 'El-Merghany',
        country: 'Egypt',
      },
    ],
  })
  addresses: Address[];

  @IsString()
  @Prop()
  image: string;

  @IsEnum(Gender)
  @Prop({ type: String, enum: Gender, required: true })
  gender: Gender;

  @Type(() => Date)
  @Prop({ required: true })
  birthDate: Date;

  @Prop({ default: true })
  isPatient: boolean;

  @Prop({ default: 'patient' })
  role: string;

  @Prop({ type: [String], default: [] })
  medicalRecord: string[];
}

export const PatientSchema = SchemaFactory.createForClass(Patient);

PatientSchema.pre<PatientDocument>('save', async function (next) {
  if (this.isModified('password')) {
    console.log('Pre-save hook: checking password for', this.email);
    if (!this.password.startsWith('$2a$')) {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      console.log('Pre-save hook: hashed password', hashedPassword);
      this.password = hashedPassword;
    } else {
      console.log('Pre-save hook: password already hashed', this.password);
    }
  }
  next();
});
