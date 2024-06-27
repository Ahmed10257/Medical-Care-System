/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Patient } from './entities/patient.entity';
import { PatientSchema } from './Schemas/patient.schema';
import { AuthService } from '../auth/auth/auth.service';

@Module({
  controllers: [PatientController],
  providers: [PatientService, AuthService],
  imports: [MongooseModule.forFeature([{ name: Patient.name, schema: PatientSchema }])],
  exports: [PatientService],
})
export class PatientModule { }
