import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IsDate, IsEnum, MinDate } from 'class-validator';
import { Doctor } from './doctor.schema';

export type AppointmentsDocument = HydratedDocument<Appointment>;

enum AppointmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

@Schema()
export class Appointment {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  })
  doctor_id: Doctor;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  })
  patient_id: mongoose.Types.ObjectId;

  @Prop({ type: Date, required: true })
  @IsDate()
  @MinDate(new Date())
  date: Date;

  @Prop({
    type: String,
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDING,
    required: true,
  })
  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
