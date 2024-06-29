import { InjectModel } from '@nestjs/mongoose';
import { Patient, PatientDocument } from './Schemas/patient.schema';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from '../auth/auth/dto/sign-up.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
  ) {}

  async create(createPatientDto: SignUpDto): Promise<Patient> {
    const createdPatient = new this.patientModel(createPatientDto);
    return await createdPatient.save();
  }

  async findAll(): Promise<Patient[]> {
    return await this.patientModel.find().exec();
  }

  async findOneByEmail(email: string): Promise<PatientDocument | null> {
    return await this.patientModel.findOne({ email }).exec();
  }

  async findOne(id: string): Promise<PatientDocument | null> {
    return await this.patientModel.findById(id).exec();
  }

  async update(
    id: string,
    updatePatientDto: UpdatePatientDto,
  ): Promise<PatientDocument | null> {
    return await this.patientModel
      .findByIdAndUpdate(id, updatePatientDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<PatientDocument | null> {
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
