import {
  IsString,
  IsNumber,
  IsEmail,
  IsEnum,
  IsBoolean,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Gender } from 'src/Common/Schemas/doctor.schema';
export class Address {
  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsNumber()
  region: number;
}

export class CreateDoctorDto {
  // @IsString()
  firstName: string;

  // @IsString()
  lastName: string;

  // @IsString()
  phone: string;

  // @IsEmail()
  email: string;

  @IsString()
  password: string;

  // @ValidateNested()
  // @Type(() => Address)
  address: Address;

  // @IsString()
  image: string;

  // @IsEnum(Gender)
  gender: Gender;

  birthdate: Date;

  @IsBoolean()
  isDoctor: boolean;

  @IsString()
  genaralSpecialization: string;

  specializes: string[];

  @IsNumber()
  views: number;

  // @IsNumber()
  fees: number;

  // @IsNumber()
  waitingTime: number;

  // @IsString()
  about: string;
}
