import { IsMongoId, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";


export class ProductDTO{

    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNumber()
    @Min(0)
    price:number;

    @IsString()
    description:string;

    @IsMongoId()
    category:string;

}