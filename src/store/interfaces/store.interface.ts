/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';

export interface StoreInterface extends Document {
    userId: string,
    companyName: string,
    companyDescription: string,
    companyEmail: string,
    companyPhone: string,
    companyNit: string,
    companyType: string,
    companyLogo: string,
    companyRegistrationDate: string,
    companyStatus: string,
    companyTermConditions: string,
}
