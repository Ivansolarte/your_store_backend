/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInterface } from './interfaces/user.interface';

@Injectable()
export class UserService {
  
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserInterface>,
  ) {
    console.log('servicio user');
  }

  async getAll(): Promise<UserInterface[]> {
    const users = await this.userModel.find().select('-password');
    return users;
  }

  async create(userDto: UserDto): Promise<UserInterface> {
    const createUser = new this.userModel(userDto);
    await createUser.save();
    return createUser;
  }

  async getById(id: string): Promise<any> {
    const user = await this.userModel.findById(id);
    return user;
  }

  async upDateUser(
    id: string,
    userDto: UserDto,
  ): Promise<UserInterface | null> {
    const updateUser = await this.userModel.findByIdAndUpdate(id, userDto, {
      new: true,
    });
    return updateUser;
  }

  async deleteUser(id: string): Promise<UserInterface | null> {
    const deleteUser = await this.userModel.findByIdAndDelete(id);
    return deleteUser;
  }

  async findByEmailOrPhone(email: string, phone: number) {
    return await this.userModel.findOne({ 
      $or: [
        { emailUser: email.trim().toLowerCase() },
        { userPhone: phone }
      ]
    }).exec();
  }
}
