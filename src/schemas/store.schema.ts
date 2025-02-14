/* eslint-disable prettier/prettier */
import { Schema } from "mongoose";

export const StoreSchema = new Schema({  
    userId: String,
    companyName: String,
    companyDescription: String,
    companyEmail: String,
    companyPhone: String,
    companyNit: String,
    companyType: String,
    companyLogo: String,
    companyRegistrationDate: {
        type: Date,
        default: Date.now 
      },
    companyStatus: String,
    companyTermConditions: String,
  })