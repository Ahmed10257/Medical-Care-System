import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IsDate, MinDate } from 'class-validator';

export type AvailableAppointmentsDocument =
  HydratedDocument<AvailableAppointment>;

@Schema()
export class AvailableAppointment {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  })
  doctor_id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: Date, required: true })
  // @IsDate()
  date: Date;
}

export const AvailableAppointmentSchema =
  SchemaFactory.createForClass(AvailableAppointment);