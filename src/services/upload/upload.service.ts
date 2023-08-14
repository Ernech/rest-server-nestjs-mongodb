import { BadRequestException, Injectable, UploadedFile } from '@nestjs/common';
import { uploadFile } from 'src/helpers/uploadFile';
import { UserService } from '../user/user.service';
import { ProductService } from '../product/product.service';
import { Response } from 'express';
@Injectable()
export class UploadService {

    constructor(private userService:UserService, private producService:ProductService){}

    async uploadNewFile(@UploadedFile() file:Express.Multer.File){
        try {
            const fileName = await uploadFile(file,undefined,'img');
            return{file:fileName}
        } catch (error) {
            console.log(error);
            throw new BadRequestException("There was an error moving the file");
        }
        
    }

    async getImage(collection:string, id:string, res:Response){
     
        switch (collection) {
            case 'users':
                return this.userService.getUserImg(id,res);
            case 'products':
                return this.producService.getProductImg(id,res);
            default:
                throw new BadRequestException("Collection not found");
        }
    }   

    async updateImage(@UploadedFile() file:Express.Multer.File, collection:string, id:string){

        switch (collection) {
            case 'users':
                const updatedUser = await this.userService.updateUserImg(file,id);
                return updatedUser;
                
            case 'products':
                const updatedProduct= await this.producService.updateProductImage(file,id);
                return updatedProduct;
 
            default:
                throw new BadRequestException("Collection not found");
        }
       
        
    }
}
