import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Appointment,
  AppointmentSchema,
} from 'src/Common/Schemas/appointment.schema';
import { AppointmentsController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { Patient, PatientSchema } from 'src/Common/Schemas/patient.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Appointment.name, schema: AppointmentSchema },
    ]),
    MongooseModule.forFeature([{ name: Patient.name, schema: PatientSchema }]),
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
