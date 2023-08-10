import { BadRequestException, Injectable, UploadedFile } from '@nestjs/common';
import { uploadFile } from 'src/helpers/uploadFile';
import { UserService } from '../user/user.service';
import { ProductService } from '../product/product.service';
import { UserDTO } from 'src/dto/user.dto';

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

    async updateImage(@UploadedFile() file:Express.Multer.File, collection:string, id:string){

        let fileName:any;
        switch (collection) {
            case 'users':
                fileName = await uploadFile(file,undefined,collection);
                const updatedUser = await this.userService.updateUserImg(fileName.toString(),id);
                return updatedUser;
                
            
            case 'products':
                fileName = await uploadFile(file,undefined,collection);
                const updatedProduct= await this.producService.updateProductImage(fileName.toString(),id);
                return updatedProduct;
                
 
            default:
                throw new BadRequestException("Collection not found");
        }
       
        
    }
}
