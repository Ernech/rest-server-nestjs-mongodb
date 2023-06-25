import { Controller, Post } from '@nestjs/common';
import { Authroization } from 'src/decorators/auth.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { CategoryDTO } from 'src/dto/category.dto';
import { RoleType } from 'src/enums/role-type.enum';
import { CategoryService } from 'src/services/category/category.service';

@Controller('category')
export class CategoryController {

    constructor(private categoryService:CategoryService){}

    @Post()
    async createCategory(categoryDTO:CategoryDTO){
        return this.categoryService.createCategory(categoryDTO);
    }

}
