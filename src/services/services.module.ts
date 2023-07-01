import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';
import { EncryptionService } from './encryption/encryption.service';
import { TokenService } from './token/token.service';
import { AuthService } from './auth/auth.service';
import { CategoryService } from './category/category.service';
import { Category, CategorySchema } from 'src/schema/category.schema';
import { ProductService } from './product/product.service';
import { Product, ProductSchema } from 'src/schema/product.schema';

@Module({
  imports:[MongooseModule.forFeature(
    [
      {name:User.name, schema:UserSchema},
      {name:Category.name, schema:CategorySchema},
      {name:Product.name,schema:ProductSchema}
    ]
    )],
  providers:[UserService, EncryptionService, TokenService, AuthService, CategoryService, ProductService],
  exports:[UserService, AuthService, CategoryService, TokenService, ProductService]
})
export class ServicesModule {}
