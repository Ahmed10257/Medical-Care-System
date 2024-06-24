import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from 'src/Common/Schemas/review.schema';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>,
  ) {}

  create(createReviewDto: CreateReviewDto) {
    const createdReview = new this.reviewModel(createReviewDto);
    return createdReview.save();
  }

  findAll() {
    return this.reviewModel.find().exec();
  }

  async findOne(id: string) {
    return this.reviewModel.findById(id).exec();
  }

  async findByDoctorId(doctorId: string) {
    return this.reviewModel
      .find({ doctor: doctorId })
      .populate('doctor')
      .populate('patient')
      .exec();
  }

  async calculateOverallRating(doctorId: string): Promise<number> {
    const reviews = await this.reviewModel.find({ doctor: doctorId }).exec();
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const overallRating = reviews.length ? totalRating / reviews.length : 0;
    return overallRating;
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    const updateReview = this.reviewModel
      .findByIdAndUpdate(id, updateReviewDto, { new: true })
      .exec();
    if (!updateReview) {
      throw new Error(`Review with ID ${id} not found`);
    }

    return updateReview;
  }

  async remove(id: string) {
    const deleteReview = this.reviewModel.findByIdAndDelete(id).exec();

    if (!deleteReview) {
      throw new Error(`Review with ID ${id} not found`);
    }

    return deleteReview;
  }
}
