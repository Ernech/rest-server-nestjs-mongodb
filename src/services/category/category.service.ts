import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryDTO } from 'src/dto/category.dto';
import { Category } from 'src/schema/category.schema';
import { TokenService } from '../token/token.service';
import { UserService } from '../user/user.service';

@Injectable()
export class CategoryService {

    constructor(@InjectModel(Category.name) private categoryModel: Model<Category>,
        private userService: UserService) { }


    async createCategory(categoryDTO: CategoryDTO, uiserId:string) {
        
        const user = await this.userService.getUserByID(uiserId);
        const newCategory = await this.categoryModel.create({ ...categoryDTO, user: user._id });
        return await newCategory.save()
    }

    async getAllCategories(page:number,limit:number){
        const categories = await this.categoryModel.find({status:true}).skip(page).limit(limit);
        return categories;
    }

    async getCategoryById(id:string){

        const category = await this.categoryModel.findOne({_id:id,status:true});
        if(!category) throw new BadRequestException(`The category with the id '${id}' does not exists`)
        return category;
    }


    async updateCategory(categoryId:string, categoryDTO:CategoryDTO,userId:string){
        const user = await this.userService.getUserByID(userId);
        const newCategory= await this.categoryModel.findByIdAndUpdate(categoryId,{...categoryDTO, user:user._id},{new:true});
        if(!newCategory){
            throw new BadRequestException(`The category with the id ${categoryId} does not exists`)
        }
        return newCategory;
    }

    async deleteCategory(categoryId:string){
        const categoryDeleted = await this.categoryModel.findByIdAndUpdate(categoryId,{status:false},{new:true});
        return categoryDeleted;
    }

}
