import { Injectable } from '@nestjs/common';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { Consultation } from 'src/Common/Schemas/consultation.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateConsultationDto } from './dto/create-consultation.dto';
@Injectable()
export class ConsultationService {
  constructor(
    @InjectModel(Consultation.name)
    private consultationModel: Model<Consultation>,
  ) {}

  create(createConsultationDto: CreateConsultationDto) {
    const createConsultation = new this.consultationModel(
      createConsultationDto,
    );
    return createConsultation.save();
  }

  findAll() {
    return this.consultationModel.find().exec();
  }

  findOne(id: string) {
    return this.consultationModel.findById(id).exec();
  }

  update(id: string, updateConsultationDto: UpdateConsultationDto) {
    const updateConsultation = this.consultationModel.findByIdAndUpdate(
      id,
      updateConsultationDto,
      { new: true },
    );
    if (!updateConsultation) {
      throw new Error(`Consultation with ID ${id} not found`);
    }
    return updateConsultation;
  }
  remove(id: string) {
    const deleteConsultation = this.consultationModel
      .findByIdAndDelete(id)
      .exec();

    if (!deleteConsultation) {
      throw new Error(`Consultation with ID ${id} not found`);
    }

    return deleteConsultation;
  }
}
