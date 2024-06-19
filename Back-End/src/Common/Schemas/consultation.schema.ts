import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Patient } from './patient.schema';
import { Doctor } from './doctor.schema';
import { IsDate, IsEnum, MinDate } from 'class-validator';

export type consultationDocument = HydratedDocument<Consultation>;

enum consultationStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

@Schema()
export class Consultation {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' })
  id_doctor: Doctor;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' })
  id_patient: Patient;

  @Prop()
  message: string;

  @Prop()
  reply: string;

  @Prop({ type: Date, required: true })
  @IsDate()
  @MinDate(new Date())
  date: Date;

  @Prop({
    type: String,
    enum: consultationStatus,
    default: consultationStatus.PENDING,
    required: true,
  })
  @IsEnum(consultationStatus)
  status: consultationStatus;
}

export const ConsultationSchema = SchemaFactory.createForClass(Consultation);
