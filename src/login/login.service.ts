/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserInterface } from 'src/user/interfaces/user.interface';
import { Model } from 'mongoose';
import { LoginInterface } from './interfaces/login.Interface';


@Controller("/login")
export class LoginService {

  constructor(
     @InjectModel('User') private readonly userModel: Model<UserInterface>,
  ){}
  
  async validateUser(body:{ email: string; password: string } ) {
    const resp = await this.userModel.findOne({
      emailUser: body.email,
      password: body.password,
    });   
    return resp;
  }
  
  create(createLoginDto: LoginDto) {
    return 'This action adds a new login';
  }
  findOne(id: number) {
    return `This action returns a #${id} login`;
  }

  update(id: number, updateLoginDto: LoginDto) {
    return `This action updates a #${id} login`;
  }

  remove(id: number) {
    return `This action removes a #${id} login`;
  }
}
