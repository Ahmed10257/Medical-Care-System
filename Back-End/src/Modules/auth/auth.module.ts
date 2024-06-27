import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { PatientModule } from '../patient/patient.module';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from './mailer/mailer.module';
// import { DoctorModule } from '../doctor/doctor.module';

@Module({
  imports: [
    PatientModule,
    // DoctorModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
