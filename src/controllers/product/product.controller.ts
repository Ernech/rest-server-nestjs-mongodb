import { Body, Controller, Headers, Post, Get, Delete,Param, Query, Put } from '@nestjs/common';
import { Authorization } from 'src/decorators/auth.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { ProductDTO } from 'src/dto/product.dto';
import { RoleType } from 'src/enums/role-type.enum';
import { ProductService } from 'src/services/product/product.service';

@Controller('product')
export class ProductController {

    constructor(private productService:ProductService){}

    @Get()
    @Authorization(false)
    async getProducts(@Query('page') page:number=0, @Query('limit') limit:number=5){
        return await this.productService.getProducts(limit,page);
    }


    @Post()
    @Authorization(true)
    async createNewProduct(@Body() productDTO:ProductDTO,@Headers() headers){
        return await this.productService.createProduct(productDTO, headers);
    }

    @Put('/:id')
    @Authorization(true)
    async updateProduct(@Param('id') id:string, @Body() productDTO:ProductDTO, @Headers() headers){
        return await this.productService.updateProduct(id,productDTO,headers);
    }

    @Delete('/:id')
    @Authorization(true)
    @Roles(RoleType.ADMIN)
    async deleteProduct(@Param('id') id:string){
        return await this.productService.deleteProduct(id);
    }

    


}
