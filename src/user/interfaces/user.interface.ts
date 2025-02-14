/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export interface UserInterface extends Document {
  _id?:string,
  fullNames: string;
  fullSurname: string;
  emailUser: string;
  password: string;
  userTerms: boolean;
  userPhone: string;
  userGender: string;
  userRol: string;
  userLocation: string;
  userBirthdate: string;
  companyName: string;
  userRegistrationDate: Date;
  userState: boolean;
}
