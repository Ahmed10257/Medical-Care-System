import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
// import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment } from './entities/appointment.entity';
import { Model } from 'mongoose';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment.name) private appointmentModel: Model<Appointment>,
  ) {}

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
    const updateAppointment = this.appointmentModel.findByIdAndUpdate(
      id,
      updateAppointmentDto,
      { new: true },
    );
    if (!updateAppointment) {
      throw new Error(`Appointment with ID ${id} not found`);
    }
    return updateAppointment;
  }

  remove(id: string) {
    const deletedAPpointment = this.appointmentModel
      .findByIdAndDelete(id)
      .exec();

    if (!deletedAPpointment) {
      throw new Error(`Appointment with ID ${id} not found`);
    }

    return deletedAPpointment;
  }
}
