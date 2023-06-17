import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class UserDTO{
    
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @IsString()
    password:string;

    @IsNotEmpty()
    @IsString()
    role:string

    img:string;

}