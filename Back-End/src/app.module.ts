/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorModule } from './Modules/doctor/doctor.module';
import { PatientModule } from './Modules/patient/patient.module';
import { AppointmentModule } from './Modules/appointment/appointment.module';
import { ConsultationModule } from './Modules/consultation/consultation.module';
import { AvailableAppointmentModule } from './Modules/available-appointment/available-appointment.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './Modules/auth/auth.module';
import { DoctorAuthModule } from './Modules/doctor/auth/auth.module';
import { FacebookStrategy } from './facebook.strategy';

@Module({
  imports: [
    DoctorModule,
    PatientModule,
    AppointmentModule,
    ConsultationModule,
    AvailableAppointmentModule, MongooseModule.forRoot('mongodb://127.0.0.1:27017/medical-app'),
    AuthModule,
    DoctorAuthModule
  ],
  controllers: [AppController],
  providers: [AppService, FacebookStrategy],
})
export class AppModule {}
