/* eslint-disable prettier/prettier */
import { IsString, IsBoolean, Min, IsNumber,IsEmail, IsDate, IsOptional,IsEmpty } from 'class-validator';

export class ProductDto {
    @IsString()
    userId: string;
    @IsString()
    storeId: string;
    @IsString()
    productName: string;
    @IsString()
    productPrice: string;
    @IsString({ each: true })
    productImgUrl: string[];
    @IsString()
    productDescription: string;  
    @IsOptional() 
    @IsDate()
    productRegistrationDate?: Date;
    @IsBoolean()
    productTerms: boolean;
    @IsBoolean()
    productState: boolean;
}
