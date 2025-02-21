/* eslint-disable prettier/prettier */
import { Schema } from "mongoose";

export const ProductSchema = new Schema({    
    userId: String, 
    storeId: String,  
    productName: String,
    productPrice: String, 
    productReference: String, 
    productImgUrl: [String],
    productDescription: String, 
    productTerms: Boolean,   
    productState: Boolean,
    productRegistrationDate: {
      type: Date,
      default: Date.now 
    }
  },
);
  