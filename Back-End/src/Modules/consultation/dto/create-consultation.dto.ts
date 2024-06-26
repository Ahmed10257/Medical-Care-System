import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsEnum,
  MinDate,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
enum consultationStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

export class CreateConsultationDto {
  @IsNotEmpty()
  @IsString()
  id_doctor: string;

  @IsNotEmpty()
  @IsString()
  id_patient: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsString()
  reply?: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @MinDate(new Date())
  date: Date;

  @IsNotEmpty()
  @IsEnum(consultationStatus)
  status: consultationStatus = consultationStatus.PENDING;
}
