// app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorModule } from './Modules/doctor/doctor.module';
import { PatientModule } from './Modules/patient/patient.module';
import { AppointmentModule } from './Modules/appointment/appointment.module';
import { ConsultationModule } from './Modules/consultation/consultation.module';
import { ReviewModule } from './Modules/review/review.module';
import { UploadModule } from './Modules/UploadPhoto/uploadPhoto.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DoctorModule,
    PatientModule,
    AppointmentModule,
    ConsultationModule,
    ReviewModule,
    UploadModule,
    MongooseModule.forRoot('mongodb://localhost:27017/medical-app'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
