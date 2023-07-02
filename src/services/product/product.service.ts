import { Injectable } from '@nestjs/common';
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

    async createProduct(productDTO:ProductDTO, headers: { authorization: any; }){
        const token = headers.authorization;
        const uid = this.tokenService.getUserID(token);
        const user = await this.userService.getUserByID(uid);
        const newProduct = await this.productRepository.create({...productDTO,user:user._id});
        return await newProduct.save();
    }

}
