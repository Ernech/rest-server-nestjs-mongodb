import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Category } from 'src/schema/category.schema';
import { Product } from 'src/schema/product.schema';
import { User } from 'src/schema/user.schema';
import { UserService } from '../user/user.service';
import { ProductService } from '../product/product.service';
import { CategoryService } from '../category/category.service';

@Injectable()
export class SearchService {
    
    constructor(@InjectModel(Category.name) private categoryRepository:Model<Category>,
    @InjectModel(Product.name) private productRepository:Model<Product>,
    @InjectModel(User.name) private userRepository:Model<User>,
    private userService:UserService,
    private productService:ProductService,
    private categoryService:CategoryService){}
    
    
     async search(collection:string,query:string){
        const collections:string[]= ['users','products','categories'];
        
        if(!collections.includes(collection)){
            throw new BadRequestException(`Allowed collections are: ${collections}`);
        }

        switch (collection) {
            case 'users': 
                    return this.searchUser(query);
                
            case 'products':
                    return this.searchProduct(query);
            case 'categories':
                return this.searchCategory(query);
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

     async searchProduct(query:string){
        const isQueryAMongoId = isValidObjectId(query);
        if(isQueryAMongoId){
            const product = await this.productService.getProductById(query);
            return product;
        }
        const regExp = new RegExp(query,'i');
        const product = await this.productRepository.find({name:regExp,status:true}).populate('category','name');
        return product;
     }

     async searchCategory(query:string){
        const isQueryAMongoId = isValidObjectId(query);
        if(isQueryAMongoId){
            const category = await this.categoryService.getCategoryById(query);
            return category;
        }

        const regExp = new RegExp(query,'i');
        const category = await this.categoryRepository.find({name:regExp,status:true});
        return category;
     }


}
