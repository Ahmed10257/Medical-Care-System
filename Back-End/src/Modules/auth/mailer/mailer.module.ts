import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from '../auth/auth.service';
import { PatientModule } from 'src/Modules/patient/patient.module';
import { DoctorModule } from 'src/Modules/doctor/doctor.module';

@Module({
  imports: [
    PatientModule,
    DoctorModule,
    ConfigModule.forRoot(),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const smtpConfig = {
          host: configService.get<string>('SMTP_HOST', 'smtp.gmail.com'),
          port: configService.get<number>('SMTP_PORT', 587),
          secure: configService.get<boolean>('SMTP_SECURE', false),
          auth: {
            user: configService.get<string>('SMTP_USER'),
            pass: configService.get<string>('SMTP_PASS'),
          },
        };

        console.log('SMTP Config:', smtpConfig);

        return {
          transport: smtpConfig,
          defaults: {
            from: `"No Reply" <${configService.get<string>('SMTP_USER')}>`,
          },
        };
      },
    }),
  ],
  exports: [MailerModule],
  providers: [AuthService],
})
export class MailModule {}
