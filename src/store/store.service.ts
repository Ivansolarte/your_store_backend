/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { StoreDto } from './dto/store.dto';
import { InjectModel } from '@nestjs/mongoose';
import { StoreInterface } from './interfaces/store.interface';
import { Model } from 'mongoose';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel('Store') private readonly storeModel: Model<StoreInterface>,
  ) {
    console.log('servicio user');
  }

  async getAll(): Promise<StoreInterface[]> {
    //// todas las tiendas
    const stores = await this.storeModel.find();
    return stores;
  }

  async getById(id: string): Promise<StoreInterface | null> {
    const store = await this.storeModel.findById(id);
    return store;
  }

  async createStore(storeDto: any): Promise<StoreInterface> {
    const createStore = new this.storeModel(storeDto);
    await createStore.save();
    return createStore;
  }
 

  async upDateStore(id: string, body: StoreDto) {
    const upDateStore = await this.storeModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true, // Asegura que las validaciones de Mongoose se apliquen
    });
    return upDateStore;
  }

  async deleteStore(id: string) {
    const deleteStore = await this.storeModel.findByIdAndDelete(id);
    return deleteStore;
  }

  async getAllByUserId(userId: string): Promise<StoreInterface[]> {
    const filter = {
      userId,
      $or: [
        { companyStatus: { $ne: false } },
        { companyStatus: { $exists: false } },
      ],
    };
    return await this.storeModel.find(filter).exec();
  }

  async updateCompanyStatus(id: string) {
    // eliminar todos los productos asociados
    return await this.storeModel.findByIdAndUpdate(
      id,
      { companyStatus: 'false' },
      { new: true },
    );
  }
  /// obtiene todas las store  que no estan eliminadas para publicar al usuario
  async getAllPublic(): Promise<StoreInterface[]> {
    return this.storeModel.find({ companyStatus: true }).exec();
  }
  ///obtener la tienda para publicar que no este eliminada
  async getByIdActive(id: string): Promise<StoreInterface | null> {
    const store = await this.storeModel.findOne({ _id: id, companyStatus: true }).exec();
    return store;
  }
}
