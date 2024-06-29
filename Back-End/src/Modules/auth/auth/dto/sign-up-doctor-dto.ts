import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';

enum Gender {
  male = 'male',
  female = 'female',
}

export class SignUpDoctorDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  specialization: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @IsNotEmpty()
  birthdate: Date;
}
