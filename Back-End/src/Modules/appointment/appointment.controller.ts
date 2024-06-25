import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller()
export class AppointmentsController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post('appointments')
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

  @Get('appointments')
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get('appointments/:id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(id);
  }

  @Patch('appointments/:id')
  update(
    @Param('id') id: string,
    @Body() UpdateAppointment: UpdateAppointmentDto,
  ) {
    return this.appointmentService.update(id, UpdateAppointment);
  }

  @Delete('appointments/:id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(id);
  }
  @Post('appointment/book')
  async bookAppointment(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.bookAppointment(createAppointmentDto);
  }
}
