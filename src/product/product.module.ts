/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from 'src/schemas/product.schema';
import { StoreModule } from 'src/store/store.module';

@Module({
  imports:[
    forwardRef(()=>StoreModule),
    MongooseModule.forFeature([{ name: "Product", schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
