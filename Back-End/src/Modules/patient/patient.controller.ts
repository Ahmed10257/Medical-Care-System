import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';
import { SignUpDto } from '../auth/auth/dto/sign-up.dto';
import { PatientGuard } from './patient_role.guaed';

@Controller('patient')
@UseGuards(PatientGuard)
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  async create(
    @Body(ValidationPipe) createPatientDto: SignUpDto,
  ): Promise<Patient> {
    return await this.patientService.create(createPatientDto);
  }

  @Get()
  async findAll(): Promise<Patient[]> {
    return await this.patientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Patient | null> {
    return await this.patientService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updatePatientDto: UpdatePatientDto,
  ): Promise<Patient | null> {
    return await this.patientService.update(id, updatePatientDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Patient | null> {
    return await this.patientService.remove(id);
  }
}
