import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorService } from './doctor.service';
import { Doctor, DoctorSchema } from 'src/Common/Schemas/doctor.schema';
import { DoctorController } from './doctor.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Doctor.name, schema: DoctorSchema }]),
  ],
  controllers: [DoctorController],
  providers: [DoctorService, AuthService],
  exports: [DoctorService],
})
export class DoctorModule {}
