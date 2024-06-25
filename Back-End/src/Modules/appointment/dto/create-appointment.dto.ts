import { IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateAppointmentDto {
  @IsMongoId()
  @IsNotEmpty()
  available_appointment_id: string;

  @IsMongoId()
  @IsNotEmpty()
  patient_id: string;
}
