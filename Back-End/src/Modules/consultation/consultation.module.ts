import { Module } from '@nestjs/common';
import { ConsultationService } from './consultation.service';
import { ConsultationController } from './consultation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Consultation } from './entities/consultation.entity';
import { ConsultationSchema } from 'src/Common/Schemas/consultation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Consultation.name, schema: ConsultationSchema },
    ]),
  ],
  controllers: [ConsultationController],
  providers: [ConsultationService],
})
export class ConsultationModule {}
