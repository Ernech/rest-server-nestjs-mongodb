import { Injectable, BadRequestException, UploadedFile } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDTO } from 'src/dto/product.dto';
import { Product } from 'src/schema/product.schema';
import { TokenService } from '../token/token.service';
import { UserService } from '../user/user.service';
import fs from 'fs';
import path from 'path';
import { uploadFile } from 'src/helpers/uploadFile';
import { Response } from 'express';

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

    async getProductImg(id:string, res:Response){
        const product:Product = await this.getProductById(id);
        const basePath = process.env.NODE_ENV ==='production'?'dist':'src';
        if(product.img){
            const pathImg= path.join(__dirname,`../../../${basePath}/files/products`,product.img);
            if(fs.existsSync(pathImg)){
                return res.sendFile(pathImg);
            }
        }
        const pathImgPlaceHolder= path.join(__dirname,`../../../${basePath}/assets`,'no-image.jpg');
        return res.sendFile(pathImgPlaceHolder);
        
    }

    async updateProductImage(@UploadedFile() file: Express.Multer.File, id:string){
        const product = await this.getProductById(id);
        if(product.img){    
            const basePath = process.env.NODE_ENV ==='production'?'dist':'src';
            const pathImg = path.join(__dirname,`../../../${basePath}/files/products`,product.img);
            if(fs.existsSync(pathImg)){
                fs.unlinkSync(pathImg);
            }
        }
        const fileName = await uploadFile(file,undefined,'products');
        product.img=fileName.toString();
        await product.save()
        return product;
    }    

}
