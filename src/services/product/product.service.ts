import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDTO } from 'src/dto/product.dto';
import { Product } from 'src/schema/product.schema';
import { TokenService } from '../token/token.service';
import { UserService } from '../user/user.service';

@Injectable()
export class ProductService {

    constructor(@InjectModel(Product.name) private productRepository:Model<Product>,
                private tokenService:TokenService,
                private userService:UserService){}

    
    async getProductById(productId:string){
        const product = await this.productRepository.findOne({_id:productId,status:true});
        if(!product) throw new BadRequestException(`The product with the id ${productId} doesn't exists`);
        return product;
    }


    async getProducts(limit:number, skip:number){
        const prodcuts = await this.productRepository.find({status:true}).skip(skip).limit(limit);
        return prodcuts;
    }

    async createProduct(productDTO:ProductDTO, headers: { authorization: any; }){
        const token = headers.authorization;
        const uid = this.tokenService.getUserID(token);
        const user = await this.userService.getUserByID(uid);
        const newProduct = await this.productRepository.create({...productDTO,user:user._id});
        return await newProduct.save();
    }

    async updateProduct(productId:string, productDTO:ProductDTO,headers:{authorization:any}){
        const token = headers.authorization;
        const uid = this.tokenService.getUserID(token);
        const user = await this.userService.getUserByID(uid);
        const updatedCategory = await this.productRepository.findByIdAndUpdate(productId,{...productDTO,user:user._id},{new:true});
        if(!updatedCategory) throw new BadRequestException(`The product with the id: ${productId} doesn't exists`);
        return updatedCategory;
    }

    async deleteProduct(productId:string){
        const product = await this.productRepository.findByIdAndUpdate(productId,{status:false},{new:true})
        return product;
    }

    

}
