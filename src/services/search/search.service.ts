import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Category } from 'src/schema/category.schema';
import { Product } from 'src/schema/product.schema';
import { User } from 'src/schema/user.schema';
import { UserService } from '../user/user.service';

@Injectable()
export class SearchService {
    
    constructor(@InjectModel(Category.name) private categoryRepository:Model<Category>,
    @InjectModel(Product.name) private productRepository:Model<Product>,
    @InjectModel(User.name) private userRepository:Model<User>,
    private userService:UserService){}
    
    
     async search(collection:string,query:string){
        const collections:string[]= ['users','products','categories'];
        
        if(!collections.includes(collection)){
            throw new BadRequestException(`Allowed collections are: ${collections}`);
        }

        switch (collection) {
            case 'users': 
                    return this.searchUser(query);
                
            case 'products':
                    break;
            case 'categories':
                break;
            default:
                throw new InternalServerErrorException("There was a problem with the search");
        }

     }

     async searchUser(query:string){

        const isQueryAMongoId = isValidObjectId(query);

        if(isQueryAMongoId){
            const user = await this.userService.getUserByID(query);
            return user;
        }

        const regExp = new RegExp(query,'i');
        const user = this.userRepository.find({$or:[{name:regExp},{email:regExp}],$and:[{state:true}]});
        return user;
        
     }



}
