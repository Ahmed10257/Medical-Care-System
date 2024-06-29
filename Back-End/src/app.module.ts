/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorModule } from './Modules/doctor/doctor.module';
import { PatientModule } from './Modules/patient/patient.module';
import { AppointmentModule } from './Modules/appointment/appointment.module';
import { ConsultationModule } from './Modules/consultation/consultation.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AvailableAppointmentModule } from './Modules/available-appointment/available-appointment.module';
import { ContactModule } from './Modules/contact/contact.module';

@Module({
  imports: [
    DoctorModule,
    PatientModule,
    AppointmentModule,
    ConsultationModule,
    AvailableAppointmentModule,
    MongooseModule.forRoot('mongodb://localhost:27017/medical-app'),
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
