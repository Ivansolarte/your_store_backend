/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
   canActivate(
    context: ExecutionContext,
  ):boolean | Promise<boolean>  {
    const request = context.switchToHttp().getRequest() as Request;
    console.log(request.headers['authorization']);
    const token = this.extractTokenFromHeader(request);

    console.log(token, 'tokenfinal');

    if (!token) {
      throw new UnauthorizedException();
    }

    const autorizado = this.jwtService.verify(token, {
      secret: 'ivanTOKEN', 
    });

    console.log(autorizado,"listoooo");
    
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
