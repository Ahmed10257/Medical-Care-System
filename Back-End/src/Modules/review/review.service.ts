import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from 'src/Common/Schemas/review.schema';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>,
  ) {}

  create(createReviewDto: CreateReviewDto) {
    const createdReview = new this.reviewModel(createReviewDto);
    return createdReview.save();
  }

  async findAll() {
    return await this.reviewModel.find().exec();
  }

  async findReviewById(id: string, patientId: string) {
    const review = await this.reviewModel.findById(id).exec();
    console.log(review.patient.toString());

    if (!review) {
      throw new NotFoundException('Review not found');
    }
    if (review.patient.toString() !== patientId) {
      throw new ForbiddenException(
        'You are not authorized to access this review',
      );
    }
    return review;
  }

  async countPatientsPerDoctor(): Promise<
    { doctorId: string; patientCount: number }[]
  > {
    return await this.reviewModel
      .aggregate([
        { $group: { _id: '$doctor', patients: { $addToSet: '$patient' } } },
        {
          $project: {
            doctorId: '$_id',
            patientCount: { $size: '$patients' },
            _id: 0,
          },
        },
      ])
      .exec();
  }

  async findByDoctorId(doctorId: string, paginationDto: PaginationDto) {
    const { limit } = paginationDto;

    const total = await this.reviewModel.countDocuments({ doctor: doctorId });

    // Fetch paginated data
    const data = await this.reviewModel
      .find({ doctor: doctorId })
      .populate('doctor')
      .populate('patient')
      .limit(limit)
      .exec();

    return {
      data,
      total,
    };
  }

  async updateReview(
    id: string,
    updateReviewDto: UpdateReviewDto,
    patientId: string,
  ) {
    const review = await this.reviewModel
      .findByIdAndUpdate(id, updateReviewDto, { new: true })
      .exec();
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    if (review.patient.toString() !== patientId) {
      throw new ForbiddenException(
        'You are not authorized to update this review',
      );
    }
    const restData = await this.reviewModel.find().exec();
    const visitors = await this.reviewModel
      .aggregate([
        { $group: { _id: '$doctor', patients: { $addToSet: '$patient' } } },
        {
          $project: {
            doctorId: '$_id',
            patientCount: { $size: '$patients' },
            _id: 0,
          },
        },
      ])
      .exec();

    return { review, restData, visitors };
  }

  async remove(id: string) {
    const deleteReview = await this.reviewModel.findByIdAndDelete(id).exec();
    if (!deleteReview) {
      throw new Error(`Review with ID ${id} not found`);
    }
    const restData = await this.reviewModel.find().exec();
    const visitors = await this.reviewModel
      .aggregate([
        { $group: { _id: '$doctor', patients: { $addToSet: '$patient' } } },
        {
          $project: {
            doctorId: '$_id',
            patientCount: { $size: '$patients' },
            _id: 0,
          },
        },
      ])
      .exec();
    return { deleteReview, restData, visitors };
  }
}
