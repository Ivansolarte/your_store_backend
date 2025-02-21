/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthTokenGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService) {}
   canActivate(
    context: ExecutionContext,
  ):boolean | Promise<boolean>  {
    const logger = new Logger('AuthToken');
    const request = context.switchToHttp().getRequest() as Request;
    const response = context.switchToHttp().getResponse<Response>();

    const token = this.extractTokenFromHeader(request);
    logger.log('Validando token');

    if (!token) {
       response.status(401).json({ message: 'Token no proporcionado' });
      return false;
    }

    try {
      const autorizado = this.jwtService.verify(token, { secret: 'ivanTOKEN' });
      logger.log(autorizado, ' Token válido');
      return true;
    } catch (error) {
      logger.error('Token inválido');
      response.status(401).json({ 
        status:401,
        message: 'Token inválido o expirado' ,
        error
      });
      return false;
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
