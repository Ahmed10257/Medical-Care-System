import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { AvailableAppointmentService } from './available-appointment.service';
import { CreateAvailableAppointmentDto } from './dto/create-available-appointment.dto';
import { UpdateAvailableAppointmentDto } from './dto/update-available-appointment.dto';
import { Doctor } from '../../Common/Schemas/doctor.schema';

@Controller()
export class AvailableAppointmentController {
  logger: any;
  constructor(
    private readonly availableAppointmentsService: AvailableAppointmentService,
  ) {}

  @Post('available-appointments')
  create(@Body() createAvailableAppointmentDto: CreateAvailableAppointmentDto) {
    return this.availableAppointmentsService.create(
      createAvailableAppointmentDto,
    );
  }

  @Get('available-appointments')
  findAll() {
    return this.availableAppointmentsService.findAll();
  }

  @Get('available-appointments/:id')
  findOne(@Param('id') id: string) {
    return this.availableAppointmentsService.findById(id);
  }

  @Get('available-appointments/doctor/:id')
  async getAppointmentsForDoctor(@Param('id') doctorId: string) {
    return this.availableAppointmentsService.findByDoctorId(doctorId);
  }
  @Patch('available-appointments/:id')
  update(
    @Param('id') id: string,
    @Body() updateAvailableAppointmentDto: UpdateAvailableAppointmentDto,
  ) {
    return this.availableAppointmentsService.updateById(
      id,
      updateAvailableAppointmentDto,
    );
  }

  @Delete('available-appointments/:id')
  remove(@Param('id') id: string) {
    return this.availableAppointmentsService.deleteById(id);
  }

  @Get('available-appointment/doctors-with-appointments')
  async findAllDoctorsWithAppointments(): Promise<Doctor[]> {
    try {
      const doctors =
        await this.availableAppointmentsService.findAllDoctorsWithAppointments();
      return doctors;
    } catch (error) {
      this.logger.error('Error in controller:', error.stack);
      throw new Error('Internal Server Error');
    }
  }
}
