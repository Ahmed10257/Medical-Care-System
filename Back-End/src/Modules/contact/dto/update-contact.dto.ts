import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateContactDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{10,15}$/, {
    message: 'Mobile must be a valid phone number with 10 to 15 digits',
  })
  mobile: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(500)
  comments: string;
}

export class UpdateContactDto extends CreateContactDto {}
