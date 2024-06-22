import { PartialType } from '@nestjs/mapped-types';
import { CreateAvailableAppointmentDto } from './create-available-appointment.dto';

export class UpdateAvailableAppointmentDto extends PartialType(
  CreateAvailableAppointmentDto,
) {}
