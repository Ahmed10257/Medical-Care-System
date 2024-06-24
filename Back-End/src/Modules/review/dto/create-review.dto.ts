import { IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  doctor: string;

  @IsString()
  patient: string;

  @IsNumber()
  rating: number;

  @IsString()
  review: string;

  createdAt: Date;
}
