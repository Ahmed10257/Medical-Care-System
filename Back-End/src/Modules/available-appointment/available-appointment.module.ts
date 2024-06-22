import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AvailableAppointmentController } from './available-appointment.controller';
import { AvailableAppointmentService } from './available-appointment.service';
import {
  AvailableAppointment,
  AvailableAppointmentSchema,
} from '../../Common/Schemas/available-appointment.schema';
import { Doctor, DoctorSchema } from '../../Common/Schemas/doctor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AvailableAppointment.name, schema: AvailableAppointmentSchema },
      { name: Doctor.name, schema: DoctorSchema },
    ]),
  ],
  controllers: [AvailableAppointmentController],
  providers: [AvailableAppointmentService],
})
export class AvailableAppointmentModule {}
