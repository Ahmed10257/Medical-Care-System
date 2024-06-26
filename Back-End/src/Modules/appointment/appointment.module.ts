import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentsController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import {
  Appointment,
  AppointmentSchema,
} from '../../Common/Schemas/appointment.schema';
import {
  AvailableAppointment,
  AvailableAppointmentSchema,
} from '../../Common/Schemas/available-appointment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Appointment.name, schema: AppointmentSchema },
    ]),
    MongooseModule.forFeature([
      { name: AvailableAppointment.name, schema: AvailableAppointmentSchema },
    ]),
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
