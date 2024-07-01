import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  // Req,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PaginationDto } from './dto/pagination.dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @Get()
  async findAll() {
    return this.reviewService.findAll();
  }

  @Get('count-patients-per-doctor')
  async countPatientsPerDoctor(): Promise<
    { doctorId: string; patientCount: number }[]
  > {
    return await this.reviewService.countPatientsPerDoctor();
  }

  @Get(':id/:patientId')
  // @UseGuards(AuthGuard)
  async getReview(
    @Param('id') id: string,
    @Param('patientId') patientId: string,
  ) {
    return this.reviewService.findReviewById(id, patientId);
  }

  @Get('doctor/:doctorId')
  async findByDoctorId(
    @Param('doctorId') doctorId: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.reviewService.findByDoctorId(doctorId, paginationDto);
  }

  @Put(':id/:patientId')
  async updateReview(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
    @Param('patientId') patientId: string,
  ) {
    return this.reviewService.updateReview(id, updateReviewDto, patientId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove(id);
  }
}
