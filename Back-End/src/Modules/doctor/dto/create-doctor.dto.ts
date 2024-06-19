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
  @IsString()
  name: string;

  @IsNumber()
  phone: number;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @ValidateNested()
  @Type(() => Address)
  address: Address;

  @IsString()
  image: string;

  @IsEnum(Gender)
  gender: Gender;

  birthdate: Date;

  @IsBoolean()
  isDoctor: boolean;

  @IsString()
  specialization: string;
}
