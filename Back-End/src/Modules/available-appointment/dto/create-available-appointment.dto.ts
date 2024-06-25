import { IsDate, MinDate, IsMongoId } from 'class-validator';

export class CreateAvailableAppointmentDto {
  @IsMongoId()
  doctor_id: string;

  // @IsDate()
  date: Date;
}