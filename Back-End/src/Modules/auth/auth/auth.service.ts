import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PatientService } from '../../patient/patient.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';
import { Patient } from '../../patient/entities/patient.entity';
import { BadRequestException, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private patientService: PatientService,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.patientService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials: User not found');
    }
    const passwordMatch = await bcrypt.compare(pass, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials: Password mismatch');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user.toObject();
    const payload = { email: user.email, sub: user._id };
    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
    };
  }

  async getPatientIdFromToken(token: string): Promise<string> {
    const cleanToken = token.split(' ')[0];
    try {
      const payload = await this.jwtService.verifyAsync(cleanToken, {
        secret: process.env.JWT_SECRET,
      });
      return payload.sub;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async signUp(signUpDto: SignUpDto): Promise<Patient> {
    const { email, password, ...rest } = signUpDto;
    const existingUser = await this.patientService.findOneByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.patientService.create({
      email,
      password: hashedPassword,
      ...rest,
    });
    return newUser;
  }

  async sendPasswordResetLink(email: string): Promise<void> {
    const user = await this.patientService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('Email does not exist');
    }
    const payload = { email: user.email, sub: user._id };
    const token = this.jwtService.sign(payload, { expiresIn: '1h' });
    const resetUrl = `http://localhost:5173/reset-password?token=${token}`;
    try {
      const emailData = {
        userName: user.name,
        resetUrl: resetUrl,
      };
      const emailHtml = `<p>Hello ${emailData.userName},</p>
      <p>It looks like you requested a password reset. Please click the link below to reset your password:</p>
      <p><a href="${emailData.resetUrl}">Reset Password</a></p>
      <p>If you did not request this, please ignore this email.</p>
      <p>Thank you,<br>Mohamed Algharabawy</p>`;

      await this.mailerService.sendMail({
        to: email,
        subject: 'Password Reset',
        html: emailHtml,
      });

      this.logger.log(`Password reset email sent to ${email}`);
    } catch (error) {
      this.logger.error(
        `Failed to send password reset email: ${error.message}`,
      );
      throw new Error(`Could not send email: ${error}`);
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.patientService.findOneByEmail(payload.email);
      if (!user) {
        throw new BadRequestException('Invalid token');
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await this.patientService.update(user._id.toString(), {
        password: hashedPassword,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
