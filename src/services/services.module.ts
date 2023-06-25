import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';
import { EncryptionService } from './encryption/encryption.service';
import { TokenService } from './token/token.service';
import { AuthService } from './auth/auth.service';
import { CategoryService } from './category/category.service';
import { Category, CategorySchema } from 'src/schema/category.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:User.name, schema:UserSchema},{name:Category.name, schema:CategorySchema}])],
  providers:[UserService, EncryptionService, TokenService, AuthService, CategoryService],
  exports:[UserService, AuthService, CategoryService, TokenService]
})
export class ServicesModule {}
