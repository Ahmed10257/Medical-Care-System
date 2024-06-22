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

@Controller('available-appointments')
export class AvailableAppointmentController {
  logger: any;
  constructor(
    private readonly availableAppointmentsService: AvailableAppointmentService,
  ) {}

  @Post()
  create(@Body() createAvailableAppointmentDto: CreateAvailableAppointmentDto) {
    return this.availableAppointmentsService.create(
      createAvailableAppointmentDto,
    );
  }

  @Get()
  findAll() {
    return this.availableAppointmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.availableAppointmentsService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAvailableAppointmentDto: UpdateAvailableAppointmentDto,
  ) {
    return this.availableAppointmentsService.updateById(
      id,
      updateAvailableAppointmentDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.availableAppointmentsService.deleteById(id);
  }

  @Get('doctors-with-appointments')
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
