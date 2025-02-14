/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';
import { StoreSchema } from 'src/schemas/store.schema';
import { StoreService } from 'src/store/store.service';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    MongooseModule.forFeature([{ name: "Store", schema: StoreSchema }])
],
  controllers: [UserController],
  providers: [
    UserService,
    StoreService
  ],
})
export class UserModule {}
