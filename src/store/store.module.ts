/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { StoreSchema } from 'src/schemas/store.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Store', schema: StoreSchema }]),
    forwardRef(()=>ProductModule),
  ],
  controllers: [StoreController],
  providers: [StoreService],
  exports: [StoreService],
})
export class StoreModule {}
