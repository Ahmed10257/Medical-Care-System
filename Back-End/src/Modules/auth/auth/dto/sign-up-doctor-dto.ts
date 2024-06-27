import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEnum,
  IsDate,
  IsBoolean,
} from 'class-validator';

enum Gender {
  Male = 'male',
  Female = 'female',
}

export class SignUpDoctorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  specialization: string;

  @IsNumber()
  @IsNotEmpty()
  phone: number;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  clinic: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @IsDate()
  @IsNotEmpty()
  birthdate: Date;

  @IsBoolean()
  @IsNotEmpty()
  isDoctor: boolean;
}
