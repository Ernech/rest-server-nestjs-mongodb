import { Body, Controller, Headers, Post, Get, Delete,Param, Query, Put } from '@nestjs/common';
import { Authroization } from 'src/decorators/auth.decorator';
import { ProductDTO } from 'src/dto/product.dto';
import { ProductService } from 'src/services/product/product.service';

@Controller('product')
export class ProductController {

    constructor(private productService:ProductService){}

    @Get()
    @Authroization(false)
    async getProducts(@Query('page') page:number=0, @Query('limit') limit:number=5){
        return await this.productService.getProducts(limit,page);
    }


    @Post()
    async createNewProduct(@Body() productDTO:ProductDTO,@Headers() headers){
        return await this.productService.createProduct(productDTO, headers);
    }

    @Put('/:id')
    async updateProduct(@Param('id') id:string, @Body() productDTO:ProductDTO, @Headers() headers){
        return await this.productService.updateProduct(id,productDTO,headers);
    }

    @Delete('/:id')
    async deleteProduct(@Param('id') id:string){
        return await this.productService.deleteProduct(id);
    }

    


}
