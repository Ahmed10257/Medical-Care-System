import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorDto } from './create-doctor.dto';
import {
  IsEmail,
  IsString,
  IsEnum,
  IsNumber,
  ValidateNested,
  IsBoolean,
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
export class UpdateDoctorDto extends PartialType(CreateDoctorDto) {
  @IsString()
  name?: string;

  @IsNumber()
  phone?: number;

  @IsEmail()
  email?: string;

  @IsString()
  password?: string;

  @ValidateNested()
  @Type(() => Address)
  address?: Address;

  @IsString()
  image?: string;

  @IsEnum(Gender)
  gender?: Gender;

  birthdate?: Date;

  @IsBoolean()
  isDoctor?: boolean;

  @IsString()
  specialization?: string;
}
