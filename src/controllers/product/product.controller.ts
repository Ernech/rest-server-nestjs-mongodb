import { Body, Controller, Headers, Post } from '@nestjs/common';
import { retry } from 'rxjs';
import { ProductDTO } from 'src/dto/product.dto';
import { ProductService } from 'src/services/product/product.service';

@Controller('product')
export class ProductController {

    constructor(private productService:ProductService){}


    @Post()
    async createNewProduct(@Body() productDTO:ProductDTO,@Headers() headers){
        return await this.productService.createProduct(productDTO, headers);
    }


}
