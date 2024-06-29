import {
  IsString,
  IsNumber,
  IsDate,
  IsEnum,
  ValidateNested,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Address } from '../Schemas/patient.schema';

enum Gender {
  Male = 'male',
  Female = 'female',
}

export class CreatePatientDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @ValidateNested({ each: true })
  @Type(() => Address)
  @ArrayMinSize(1)
  addresses: Address[];

  @IsString()
  image: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsDate()
  @Type(() => Date)
  birthDate: Date;
}
