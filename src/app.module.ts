import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { LoginModule } from './login/login.module';
import { StoreModule } from './store/store.module';
import { ProductModule } from './product/product.module';
import * as dotenv from 'dotenv';

dotenv.config();

console.log(process.env.NODE_ENV,"moodule");

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost/your_store'),
    UserModule,
    MongooseModule.forRoot('mongodb+srv://admin:12345@cluster0.a2eev.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    LoginModule,
    StoreModule,
    ProductModule
    
  ],
})
export class AppModule {}
