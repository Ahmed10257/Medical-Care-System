/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { SignUpDoctorDto } from '../auth/auth/dto/sign-up-doctor-dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { DoctorGuard } from './doctor_role.guard';

@Controller('doctor')
@UseGuards(DoctorGuard)
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) { }

  @Post()
  create(@Body() createDoctorDto: SignUpDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  @Get('search')
  async searchDoctors(
    @Query('speciality') speciality: string,
    @Query('city') city: string,
    @Query('doctorOrHospital') doctorOrHospital: string,
  ) {
    const results = await this.doctorService.searchDoctor({ speciality, city, doctorOrHospital });
    return results;
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(id, updateDoctorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorService.remove(id);
  }

  @Patch(':id/update-password')
  async updateDoctorPassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<{ success: boolean }> {
    try {
      const { oldPassword, newPassword } = updatePasswordDto;
      const updated = await this.doctorService.verifyAndUpdateDoctorPassword(id, oldPassword, newPassword);
      return { success: updated };
    } catch (error) {
      throw new Error(`Failed to update password: ${error.message}`);
    }
  }
}
