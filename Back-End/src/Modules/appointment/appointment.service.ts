import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointment } from '../../Common/Schemas/appointment.schema';
import { AvailableAppointment } from '../../Common/Schemas/available-appointment.schema';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment.name) private appointmentModel: Model<Appointment>,
    @InjectModel(AvailableAppointment.name)
    private availableAppointmentModel: Model<AvailableAppointment>,
  ) {}

  async bookAppointment(createAppointmentDto: CreateAppointmentDto) {
    const { available_appointment_id, patient_id } = createAppointmentDto;

    const availableAppointment = await this.availableAppointmentModel
      .findById(available_appointment_id)
      .exec();

    if (!availableAppointment) {
      throw new NotFoundException('Available appointment not found');
    }
    try {
      const newAppointment = new this.appointmentModel({
        doctor_id: availableAppointment.doctor_id,
        patient_id: patient_id,
        date: availableAppointment.date,
        status: 'pending',
      });

      const savedAppointment = await newAppointment.save();

      await this.availableAppointmentModel
        .deleteOne({ _id: available_appointment_id })
        .exec();

      return savedAppointment;
    } catch (error) {
      throw new Error(`Error booking appointment: ${error.message}`);
    }
  }

  create(createAppointmentDto: CreateAppointmentDto) {
    const createAppointment = new this.appointmentModel(createAppointmentDto);
    return createAppointment.save();
  }

  findAll() {
    return this.appointmentModel.find().exec();
  }

  findOne(id: string) {
    return this.appointmentModel.findById(id).exec();
  }

  update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    const updateAppointment = this.appointmentModel
      .findByIdAndUpdate(id, updateAppointmentDto, { new: true })
      .exec();
    if (!updateAppointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    return updateAppointment;
  }

  remove(id: string) {
    const deletedAppointment = this.appointmentModel
      .findByIdAndDelete(id)
      .exec();

    if (!deletedAppointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    return deletedAppointment;
  }
  async findAllByPatientId(patientId: string): Promise<Appointment[]> {
    return this.appointmentModel.find({ patient_id: patientId }).exec();
  }
}
