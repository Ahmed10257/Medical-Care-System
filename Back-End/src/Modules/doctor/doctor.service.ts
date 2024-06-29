import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor, DoctorDocument } from 'src/Common/Schemas/doctor.schema';
import { SignUpDoctorDto } from '../auth/auth/dto/sign-up-doctor-dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(@InjectModel(Doctor.name) private doctorModel: Model<Doctor>) {}

  create(CreateDoctorDto: SignUpDoctorDto) {
    const createPatient = new this.doctorModel(CreateDoctorDto);
    return createPatient.save();
  }

  findAll() {
    return this.doctorModel.find().exec();
  }

  findOne(id: string) {
    return this.doctorModel.findById(id).exec();
  }

  async findOneByEmail(email: string): Promise<DoctorDocument | null> {
    return await this.doctorModel.findOne({ email }).exec();
  }

  async update(
    id: string,
    updatePatientDto: UpdateDoctorDto,
  ): Promise<DoctorDocument | null> {
    return await this.doctorModel
      .findByIdAndUpdate(id, updatePatientDto, { new: true })
      .exec();
  }

  remove(id: string) {
    const deletedPatient = this.doctorModel.findByIdAndDelete(id).exec();

    if (!deletedPatient) {
      throw new Error(`Doctor with ID ${id} not found`);
    }

    return deletedPatient;
  }
}
