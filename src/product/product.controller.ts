/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Query,
  Res,  
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { StoreService } from 'src/store/store.service';
import { Response } from 'express';

@Controller('product')
export class ProductController {

  private readonly logger = new Logger('ProductService');

  constructor(
    private readonly productService: ProductService,
    private readonly storeService: StoreService,
  ) {}

  // obtiene todos los prodcutos en BD o los del mismo usuario y tienda
  @Get()
  async getAll(@Query('id') id?: string, @Query('userId') userId?: string) {
    if (id && userId) {
      const products = this.productService.getAllProductIdAndUserId(id, userId);
      return await products;
    }
    const products = this.productService.getAllProduct();
    return await products;
  }
  // obtene los producto segun ID
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.productService.getById(id);
  }
  // crea un producto
  @Post()
  async create(@Body() productDto: ProductDto) {
    return await this.productService.createProduct(productDto);
  }
  // actualizar  un prodcuto
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: ProductDto) {
    return this.productService.updateProduct(id, body);
  }
  // elimina un proeducto con id
  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productService.deleteProduct(id);
  }
  // /////
  @Get(':id/public')
  async getProductPublic(@Param('id') id: string, @Res() res :Response ) {
    const store = await this.storeService.getByIdActive(id);
    console.log(store);
    if (store) {
      
      console.log('entro a buscar el producto');
      
      const products = await this.productService.getAllProductPublic(id);
      console.log(products);
      return res.status(200).json({
        status:true,
        companyName:store?.companyName,
        companyDescription:store?.companyDescription,
        companyLogo:store?.companyLogo,
        companyPhone:store?.companyPhone,
        data:products
      })
      
    }
    return res.status(409).json({
      status:false,
      storeName:"",
      data:[]
    })
  }
}
