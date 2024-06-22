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

enum gender {
  Male = 'male',
  Female = 'femail',
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
  @IsString()
  @Prop()
  name: string;

  @IsNumber()
  @Prop()
  age: number;

  @IsNumber()
  @Prop()
  phone: number;

  @IsString()
  @Prop()
  email: string;

  @IsString()
  @Prop()
  password: string;

  @ValidateNested({ each: true })
  @Type(() => Address)
  @ArrayMinSize(1)
  @Prop({ type: [Address] })
  addresses: Address[];

  @IsString()
  @Prop()
  image: string;

  @IsEnum(gender)
  @Prop({ type: String, enum: gender })
  gender: gender;

  @IsDate()
  @Prop()
  birthDate: Date;

  @Prop({ default: true })
  isPatient: boolean;

  @Prop()
  medicaalRecord: string[];

  async savePassword(this: PatientDocument) {
    if (this.isModified('password')) {
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
    }
  }
}

export const PatientSchema = SchemaFactory.createForClass(Patient);

PatientSchema.pre<PatientDocument>('save', async function (next) {
  if (this.isModified('password')) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }
  next();
});
