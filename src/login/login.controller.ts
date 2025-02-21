/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { AuthTokenGuard } from 'src/guards/auth-token/auth-token.guard';

@Controller('login')
export class LoginController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly loginService: LoginService,
  ) {}

  @Post()
  async login(@Body() body: LoginDto, @Res() res: Response) {
    const resp: any = await this.loginService.validateUser(body);    
    if (resp) {      
      const token = this.jwtService.sign({
        user: resp?.fullNames,
        id: resp?._id,
        userPhone: resp.userPhone,
      });
      res.setHeader('Authorization', `Bearer ${token}`);
      return res.status(HttpStatus.OK).json({
        status: true,
        token: token,
        data: resp,
        message: 'El usuario existoso!',
      });
    }
    return res.status(409).json({
      status: false,
      data: [],
      message: 'El  usuario no existoso!',
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loginService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoginDto: LoginDto) {
    return this.loginService.update(+id, updateLoginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loginService.remove(+id);
  }
}
