import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Req,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { Request as Users } from 'express';

interface User extends Users {
  email: string;
  password: string;
}

@Controller('auth')
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
    const token = await this.authService.signIn(email, password);
    const accessTokenCookie = `Authentication=${token.access_token}; HttpOnly; Path=/; Max-Age=3600`;
    request.res.setHeader('Content-Type', 'application/json');
    request.res.setHeader('Set-Cookie', [accessTokenCookie]);
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Get('patient-id-from-token')
  async getPatientIdFromToken(
    @Req() request: Request & { cookies: Record<string, string> },
  ) {
    let token = request.cookies['Authentication'];
    if (token) {
      token = token.replace(' HttpOnly', '');
    }

    try {
      const patientId = await this.authService.getPatientIdFromToken(token);
      return { patientId };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
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

  // For only testing guards
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
