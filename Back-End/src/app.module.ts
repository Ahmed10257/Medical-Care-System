import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { AppointmentModule } from './appointment/appointment.module';
import { ConsultationModule } from './consultation/consultation.module';

@Module({
  imports: [DoctorModule, PatientModule, AppointmentModule, ConsultationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
