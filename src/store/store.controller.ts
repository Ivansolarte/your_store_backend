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
  private readonly logger = new Logger('tienda');

  constructor(
    private readonly storeService: StoreService,
    private readonly productService: ProductService,
  ) {
    this.logger.log('controStore');
  }

  @Get()
  async getAllStore(@Query('userId') userId?: string, @Res() res?: Response) {
    if (userId) {
      this.logger.log('todas las tiendas segun un usuario');
      const resp = await this.storeService.getAllByUserId(userId); // Filtra por userId
      return res?.status(200).json({
        status: true,
        data: resp,
        message: 'las tiendas del usuario',
      });
    }
    this.logger.log('todas las tiendas');
    const respAll = await this.storeService.getAll();
    return res?.status(200).json({
      status: true,
      data: respAll,
      message: 'Todas las tiendas',
    });
  }
  //Api publica
  //Todas las tiendas para mostar  a los usuarios
  @Get('public')
  getStorePublic() {
    const resp = this.storeService.getAllPublic();
    return resp;
  }
  //Obtenemos un tienda por su id
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.storeService.getById(id);
  }
  //Obtenemos un tienda por su id
  @Get(':id/store')
  getStoreByUserID(@Param('id') id: string) {
    return this.storeService.getById(id);
  }
  //Api crear una tienda
  @Post()
  @UseGuards(AuthTokenGuard)
  async createStore(@Body() storeDto: StoreDto) {
    return await this.storeService.createStore(storeDto);
  }
  //Edita un store
  @Patch(':id')
  @UseGuards(AuthTokenGuard)
  async updateStore(@Param('id') id: string, @Body() storeDto: StoreDto) {
    return await this.storeService.upDateStore(id, storeDto);
  }
  //Es el eliminar una store pero solo cambia el state
  @Patch(':id/deactivate')
  @UseGuards(AuthTokenGuard)
  async deactivateStore(@Param('id') id: string) {
    const resp = await this.storeService.updateCompanyStatus(id);
    if (resp) {
      this.logger.log('entro a l delete de los productos');
      await this.productService.massDelete(id);
    }
    return resp;
  }
  //Elimina/pone state a false
  @Delete(':id')
  @UseGuards(AuthTokenGuard)
  async deleteStore(@Param('id') id: string) {
    const resp = await this.storeService.deleteStore(id);
    if (resp) {
      await this.productService.massDelete(id);
    }
    return resp;
  }
}
