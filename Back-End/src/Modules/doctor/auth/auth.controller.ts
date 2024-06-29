import {
  Controller,
  Get,
  Post,
  Body,
  Logger,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request as User } from 'express';
import { SignUpDoctorDto } from 'src/Modules/auth/auth/dto/sign-up-doctor-dto';

@Controller('doctor-auth')
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Req()
    request: User,
    @Body()
    signInDto: Record<string, any>,
  ) {
    const { email, password } = request.body;
    const token = await this.authService.signInDoctor(email, password);
    const accessTokenCookie = `Authentication=${token.access_token}; HttpOnly; Path=/; Max-Age=3600`;
    request.res.setHeader('Content-Type', 'application/json');
    request.res.setHeader('Set-Cookie', [accessTokenCookie]);
    return this.authService.signInDoctor(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signUp(@Body() signUpDto: SignUpDoctorDto) {
    return this.authService.signUpDoctor(signUpDto);
  }

  @Get('doctor-id-from-token')
  async getPatientIdFromToken(
    @Req() request: Request & { cookies: Record<string, string> },
  ) {
    let token = request.cookies['Authentication'];
    if (token) {
      token = token.replace(' HttpOnly', '');
    }

    try {
      const doctorId = await this.authService.getDoctorIdFromToken(token);
      return { doctorId };
    } catch (error) {
      {
        error: 'Invalid token';
      }
    }
  }

  @Post('forget-password')
  @HttpCode(HttpStatus.OK)
  async forgetPassword(@Body('email') email: string) {
    await this.authService.sendPasswordResetLink(email);
    return { message: 'Password reset link sent successfully' };
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(
    @Body('token') token: string,
    @Body('password') password: string,
  ) {
    await this.authService.resetPassword(token, password);
    return { message: 'Password reset successfully' };
  }
}
