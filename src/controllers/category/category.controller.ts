import { Body, Controller, Get, Headers, Param, Post, Put, Query, Delete, Request } from '@nestjs/common';
import { Authorization } from 'src/decorators/auth.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { CategoryDTO } from 'src/dto/category.dto';
import { RoleType } from 'src/enums/role-type.enum';
import { CategoryService } from 'src/services/category/category.service';

@Controller('category')
export class CategoryController {

    constructor(private categoryService:CategoryService){}

    @Post()
    @Authorization(true)
    async createCategory(@Body() categoryDTO:CategoryDTO, @Request() req:any ){
       return this.categoryService.createCategory(categoryDTO, req.userId);
    }

    @Get()
    @Authorization(false)
    async getCategories(@Query('page') page:number=0, @Query('limit') limit:number=5){
        return this.categoryService.getAllCategories(page,limit);
    }

    @Put('/:id')
    @Authorization(true)
    async updateCategory(@Param('id') id:string, @Body() categoryDTO:CategoryDTO, @Request() req:any){
        return this.categoryService.updateCategory(id,categoryDTO,req.userId);
    }

    @Delete('/:id')
    @Authorization(true)
    @Roles(RoleType.ADMIN)
    async deleteCategory(@Param('id') id:string){
        return this.categoryService.deleteCategory(id);
    }
}
