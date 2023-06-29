import { Body, Controller, Get, Headers, Param, Post, Put, Query, Delete } from '@nestjs/common';
import { Authroization } from 'src/decorators/auth.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { CategoryDTO } from 'src/dto/category.dto';
import { RoleType } from 'src/enums/role-type.enum';
import { CategoryService } from 'src/services/category/category.service';

@Controller('category')
export class CategoryController {

    constructor(private categoryService:CategoryService){}

    @Post()
    async createCategory(@Body() categoryDTO:CategoryDTO, @Headers() headers){
        return this.categoryService.createCategory(categoryDTO, headers);
    }

    @Get()
    @Authroization(false)
    async getCategories(@Query('page') page:number=0, @Query('limit') limit:number=5){
        return this.categoryService.getAllCategories(page,limit);
    }

    @Put('/:id')
    async updateCategory(@Param('id') id:string, @Body() categoryDTO:CategoryDTO, @Headers() headers){
        return this.categoryService.updateCategory(id,categoryDTO,headers);
    }

    @Delete('/:id')
    async deleteCategory(@Param('id') id:string){
        return this.categoryService.deleteCategory(id);
    }
}
