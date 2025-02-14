/* eslint-disable prettier/prettier */
import { Schema } from "mongoose";

export const UserSchema = new Schema({    
      fullNames: String,
      fullSurname: String,
      emailUser: String,
      password: { type: String, select: false },
      userTerms: String,
      userPhone: String,
      userGender: String,
      userRol: String,
      userState: String,
      userLocation: String,
      userBirthdate: Date,
      companyName: String,
      userRegistrationDate: {
        type: Date,
        default: Date.now 
      }
    },
    {
      toJSON: {
        transform(doc, ret) {
          delete ret.password;
          delete ret.companyName;
          delete ret.__v;
        },
      },
    }
);
    