/* eslint-disable prettier/prettier */
import { IsString, IsBoolean, Min, IsNumber,IsEmail, IsDate, IsOptional,IsEmpty } from 'class-validator';


export class UserDto {
  @IsString()
  fullNames: string;
  @IsString()
  fullSurname: string;
  @IsEmail()
  emailUser: string;
  @IsString()
  password?: string;
  @IsBoolean()
  userTerms: boolean;
  @IsNumber()
  @Min(1)
  userPhone: number;
  @IsString()
  userGender: string;
  @IsString()
  userRol: string;
  @IsString()
  userLocation: string;
  @IsString()
  companyName: string;
  @IsString()
  userBirthdate: Date;
  @IsOptional() 
  @IsDate()
  userRegistrationDate?: Date;
  @IsBoolean()
  userState: boolean;
}
