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
  Query,
  Logger,
  Res,
  UseGuards,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreDto } from './dto/store.dto';
import { ProductService } from 'src/product/product.service';
import { AuthTokenGuard } from 'src/guards/auth-token/auth-token.guard';
import { Response } from 'express';

@Controller('store')
export class StoreController {

  private readonly logger = new Logger('StoreService');
  
  constructor(
    private readonly storeService: StoreService,
    private readonly productService: ProductService,
  ) {}

  @Get()  
  @UseGuards(AuthTokenGuard)
  async getAllStore(@Query('userId') userId?: string, @Res() res?: Response) {
    if (userId) {
      const resp = await this.storeService.getAllByUserId(userId); // Filtra por userId
      return res?.status(200).json({
        status:true,
        data:resp,
        message:"las tiendas del usuario"
      })
    }
    return await this.storeService.getAll();
  }
   // todas las tiendas para mostar  a los usuarios 
   @Get('public')
   getStorePublic() {
     const resp = this.storeService.getAllPublic();
     return  resp
   }
  // obtenemos un tienda por su id
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.storeService.getById(id);
  }
  // obtenemos un tienda por su id
  @Get(':id/store')
  getStoreByUserID(@Param('id') id: string) {
    return this.storeService.getById(id);
  } 

  @Post()
  async createStore(@Body() storeDto: StoreDto) {
    return await this.storeService.createStore(storeDto);
  }  

  @Patch(':id')
  async updateStore(@Param('id') id: string, @Body() storeDto: StoreDto) {
    return await this.storeService.upDateStore(id, storeDto);
  }

  @Delete(':id')
  async deleteStore(@Param('id') id: string) {
    this.logger.log('entro a l delete de store');
    console.log('entro dele store');
    
    const resp = await this.storeService.deleteStore(id);
    console.log(resp);
    
    if (resp) {
      this.logger.log('entro a l delete de los productos');
      await this.productService.massDelete(id);
    }
    return resp;
  }

  @Patch(':id/deactivate')
  async deactivateStore(@Param('id') id: string) {
    this.logger.log("entro a desactivar la tienda")
    const resp = await this.storeService.updateCompanyStatus(id);
    console.log(resp);
    
    if (resp) {
      this.logger.log('entro a l delete de los productos');
      await this.productService.massDelete(id);
    }
    return resp;
  }
}
