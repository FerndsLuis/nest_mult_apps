import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers['x-api-token'];
    console.log('🚀 ~ AuthGuard ~ canActivate ~ token:', token);
    console.log(
      '🚀 ~ AuthGuard ~ canActivate ~ token:',
      this.configService.get['API_TOKEN'],
    );
    console.log(
      '🚀 ~ AuthGuard ~ canActivate ~ token:',
      token === this.configService.get['API_TOKEN'],
    );
    return token === this.configService.get['API_TOKEN'];
  }
}
