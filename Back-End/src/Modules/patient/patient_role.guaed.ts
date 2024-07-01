import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PatientGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async jwtTokenAnalysis(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromCookie(request);
    console.log(token);
    console.log(process.env.JWT_SECRET);

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      return payload;
    } catch (err) {
      throw new UnauthorizedException('Unauthorized');
    }
  }

  private extractTokenFromCookie(request: any): string | undefined {
    if (request.cookies && request.cookies.Authentication) {
      return request.cookies.Authentication;
    }
    return undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const payload = await this.jwtTokenAnalysis(context);
    console.log(payload);
    try {
      if (payload && payload.isPatient) {
        return true;
      } else {
        throw new UnauthorizedException('test');
      }
    } catch (err) {
      throw new UnauthorizedException('Unauthorized user');
    }
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
