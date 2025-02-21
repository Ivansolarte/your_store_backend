/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export interface ProductInterface extends Document {
  userId: string;
  storeId: string;
  productName: string;
  productPrice: string;
  productImgUrl: [string];
  productDescription: string;
  productRegistrationDate?: Date;
  productTerms: boolean;
  productState: boolean;
  productReference: string;
}
