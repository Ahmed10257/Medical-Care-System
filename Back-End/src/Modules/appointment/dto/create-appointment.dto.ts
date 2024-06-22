import {
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  MinDate,
} from 'class-validator';
import { Type } from 'class-transformer';

enum AppointmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

export class CreateAppointmentDto {
  @IsMongoId()
  doctor_id: string;

  @IsMongoId()
  patient_id: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  @MinDate(new Date())
  date: Date;

  @IsNotEmpty()
  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;
}
