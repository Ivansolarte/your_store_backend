/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { AuthTokenGuard } from 'src/guards/auth-token/auth-token.guard';
import { StoreService } from 'src/store/store.service';
import { Response } from 'express';

@Controller('user')
// @UseGuards(AuthTokenGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly storeService: StoreService,
  ) {}

  @Get()
  async getAllUsers() {
    const users = this.userService.getAll();
    return await users;
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const user = this.userService.getById(id);
    return await user;
  }

  @Post()
  async createUser(@Body() body: UserDto, @Res() res: Response) {
    body.userRol = 'Client';
    //validar  si ya existe el email
    // console.log(body);

    const existingUser = await this.userService.findByEmailOrPhone(
      body.emailUser,
      body.userPhone,
    );
    if (existingUser) {
      return res.status(409).json({
        status: false,
        message:
          'el correo electronico o el teléfono ya se encuentran registrado por un usuario',
      });
    }
    const createUser: any = await this.userService.create(body);
    const bodyStore = { userId: createUser.id, companyName: body.companyName };
    await this.storeService.createStore(bodyStore);
    return res.status(202).json({
      status: true,
      message: 'Se registro con exito',
    });
  }

  @Put(':id')
  async upDateUser(@Param('id') id: string, @Body() body: UserDto) {
    const upDateUser = this.userService.upDateUser(id, body);
    return await upDateUser;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const resp = this.userService.deleteUser(id);
    return await resp;
  }
}
