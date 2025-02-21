/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports:[
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: 'ivanTOKEN', // Puedes usar una variable de entorno para el secreto
      signOptions: { expiresIn: '6h' }, 
    }),
  ],  
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
