import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAvailableAppointmentDto } from './dto/create-available-appointment.dto';
import { UpdateAvailableAppointmentDto } from './dto/update-available-appointment.dto';
import { AvailableAppointment } from '../../Common/Schemas/available-appointment.schema';
import { Doctor } from '../../Common/Schemas/doctor.schema';

@Injectable()
export class AvailableAppointmentService {
  private readonly logger = new Logger(AvailableAppointmentService.name);

  constructor(
    @InjectModel(AvailableAppointment.name)
    private readonly availableAppointmentModel: Model<AvailableAppointment>,
    @InjectModel(Doctor.name)
    private readonly doctorModel: Model<Doctor>,
  ) {}

  async create(
    createAvailableAppointmentDto: CreateAvailableAppointmentDto,
  ): Promise<AvailableAppointment> {
    try {
      const createdAppointment = new this.availableAppointmentModel(
        createAvailableAppointmentDto,
      );
      return await createdAppointment.save();
    } catch (error) {
      this.logger.error('Error creating appointment', error.stack);
      throw new Error('Internal Server Error');
    }
  }

  async findAll(): Promise<AvailableAppointment[]> {
    try {
      return await this.availableAppointmentModel.find().exec();
    } catch (error) {
      this.logger.error('Error finding all appointments', error.stack);
      throw new Error('Internal Server Error');
    }
  }

  async findById(id: string): Promise<AvailableAppointment | null> {
    try {
      return await this.availableAppointmentModel.findById(id).exec();
    } catch (error) {
      this.logger.error(`Error finding appointment by ID ${id}`, error.stack);
      throw new Error('Internal Server Error');
    }
  }

  async updateById(
    id: string,
    updateAvailableAppointmentDto: UpdateAvailableAppointmentDto,
  ): Promise<AvailableAppointment | null> {
    try {
      return await this.availableAppointmentModel
        .findByIdAndUpdate(id, updateAvailableAppointmentDto, { new: true })
        .exec();
    } catch (error) {
      this.logger.error(`Error updating appointment by ID ${id}`, error.stack);
      throw new Error('Internal Server Error');
    }
  }

  async deleteById(id: string): Promise<AvailableAppointment | null> {
    try {
      return await this.availableAppointmentModel.findByIdAndDelete(id).exec();
    } catch (error) {
      this.logger.error(`Error deleting appointment by ID ${id}`, error.stack);
      throw new Error('Internal Server Error');
    }
  }

  async findAllDoctorsWithAppointments(): Promise<Doctor[]> {
    try {
      const pipeline = [
        {
          $lookup: {
            from: 'doctors',
            localField: 'doctor_id',
            foreignField: '_id',
            as: 'doctor',
          },
        },
        {
          $unwind: '$doctor',
        },
        {
          $group: {
            _id: '$doctor._id',
            doctor: { $first: '$doctor' },
            appointments: {
              $push: {
                id: '$_id',
                date: '$date',
              },
            },
          },
        },
      ];

      this.logger.debug('Aggregation pipeline:', JSON.stringify(pipeline));

      const results = await this.availableAppointmentModel
        .aggregate(pipeline)
        .exec();
      this.logger.debug('Aggregation results:', JSON.stringify(results));
      return results;
    } catch (error) {
      this.logger.error(
        'Error finding all doctors with appointments',
        error.stack,
      );
      throw new Error('Internal Server Error');
    }
  }
}
