import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor } from 'src/Common/Schemas/doctor.schema';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(@InjectModel(Doctor.name) private doctorModel: Model<Doctor>) { }

  create(CreateDoctorDto: CreateDoctorDto) {
    const createPatient = new this.doctorModel(CreateDoctorDto);
    return createPatient.save();
  }

  findAll() {
    return this.doctorModel.find().exec();
  }

  findOne(id: string) {
    return this.doctorModel.findById(id).exec();
  }

  update(id: string, UpdateDoctorDto: UpdateDoctorDto) {
    const updatePatient = this.doctorModel
      .findByIdAndUpdate(id, UpdateDoctorDto, { new: true })
      .exec();

    if (!updatePatient) {
      throw new Error(`Doctor with ID ${id} not found`);
    }

    return updatePatient;
  }

  remove(id: string) {
    const deletedPatient = this.doctorModel.findByIdAndDelete(id).exec();

    if (!deletedPatient) {
      throw new Error(`Doctor with ID ${id} not found`);
    }

    return deletedPatient;
  }

  async searchDoctor({ speciality, city, doctorOrHospital }: { speciality?: string; city?: string; doctorOrHospital?: string }): Promise<Doctor[]> {
    let query = {};

    if (speciality) {
      query['speciality'] = speciality;
    }
    if (city) {
      query['city'] = city;
    }
    if (doctorOrHospital) {
      query['type'] = doctorOrHospital;
    }

    return this.doctorModel.find(query);
  }
}
