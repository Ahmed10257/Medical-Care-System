import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Patient } from './entities/patient.entity';
import { PatientDocument } from './Schemas/patient.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const createdPatient = new this.patientModel(createPatientDto);
    await createdPatient.save();
    return await createdPatient.save();
  }

  async findAll(): Promise<Patient[]> {
    return await this.patientModel.find().exec();
  }

  async findOne(id: string): Promise<Patient | null> {
    return await this.patientModel.findById(id).exec();
  }

  async update(
    id: string,
    updatePatientDto: UpdatePatientDto,
  ): Promise<Patient | null> {
    return await this.patientModel
      .findByIdAndUpdate(id, updatePatientDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Patient | null> {
    return await this.patientModel.findByIdAndDelete(id).exec();
  }

  async verifyPatientPassword(
    patient: Patient,
    plainPassword: string,
    newPassword: string,
  ): Promise<boolean> {
    const isPasswordCorrect = await bcrypt.compare(
      plainPassword,
      patient['password'],
    );
    if (!isPasswordCorrect) {
      return false;
    } else {
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      await this.patientModel.findByIdAndUpdate(patient['_id'], {
        password: hashedNewPassword,
      });
      return true;
    }
  }
}
