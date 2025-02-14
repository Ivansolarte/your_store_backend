/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { ProductInterface } from './interfaces/product.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductService {

  private readonly logger = new Logger('ProductService');

  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductInterface>,
  ) {
    this.logger.log('servicio product');
  }

  async getAllProduct(): Promise<ProductInterface[]> {
    const products = this.productModel.find();
    return await products;
  }

  async getById(id: string) {
    const product = this.productModel.findById(id);
    return await product;
  }

  async createProduct(productDto: ProductDto) {
    const createProduct = new this.productModel(productDto);
    await createProduct.save();
    return createProduct;
  }

  async updateProduct(id: string, body: ProductDto) {
    const updateProduct = this.productModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return updateProduct;
  }

  async deleteProduct(id: string) {
    const deleteProduct = await this.productModel.findByIdAndDelete(id);
    return deleteProduct;
  }

  //// todos los productos de un usurios y una tienda
  async getAllProductIdAndUserId(
    id: string,
    userId: string,
  ): Promise<ProductInterface[]> {
    return await this.productModel.find({ storeId: id, userId: userId }).exec();
  }
  // eliminar todos los productos asociados a una tienda
  async massDelete(id: string): Promise<{ deletedCount?: number }> {
    const result = await this.productModel.deleteMany({ storeId: id }).exec();
    return { deletedCount: result.deletedCount };
  }

  async getAllProductPublic(id: string) {
    console.log('Obteniendo productos para la tienda con ID:', id);
    
    const products = await this.productModel.find({ storeId: id }).exec();
    console.log(products);
    
    return products;
  }
}
