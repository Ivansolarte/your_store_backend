/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export interface LoginInterface extends Document {
  email: string;
  password: string;
}
