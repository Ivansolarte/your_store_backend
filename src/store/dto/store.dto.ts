/* eslint-disable prettier/prettier */
import { IsString, IsBoolean, Min, IsNumber,IsEmail, IsDate, IsOptional,IsEmpty } from 'class-validator';

export class StoreDto {
    @IsString()
    userId: string;
    @IsString()
    companyName: string;
    @IsString()
    companyDescription: string;
    @IsString()
    companyEmail: string;
    @IsString()
    companyPhone: string;
    @IsString()
    companyNit: string;
    @IsString()
    companyType: string;
    @IsString()
    companyLogo: string;
    @IsOptional() 
    @IsDate()
    companyRegistrationDate: Date;
    @IsBoolean()
    companyStatus: boolean;
    @IsBoolean()
    companyTermConditions: boolean;
}
