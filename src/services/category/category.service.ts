import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryDTO } from 'src/dto/category.dto';
import { Category } from 'src/schema/category.schema';

@Injectable()
export class CategoryService {

    constructor(@InjectModel(Category.name) private categoryModel:Model<Category>){}


    async createCategory(categoryDTO: CategoryDTO){
        const newCategory = await this.categoryModel.create(categoryDTO);
        return await newCategory.save()
    }
}
