import {
  IsString,
  IsNumber,
  IsDate,
  IsEnum,
  ValidateNested,
  ArrayMinSize,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Address } from '../Schemas/patient.schema';

enum Gender {
  Male = 'male',
  Female = 'female',
}

export class UpdatePatientDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Address)
  @ArrayMinSize(1)
  addresses?: Address[];

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  birthDate?: Date;
}
