import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { ServicesModule } from 'src/services/services.module';
import { AuthController } from './auth/auth.controller';
import { CategoryController } from './category/category.controller';
import { ProductController } from './product/product.controller';
import { SearchController } from './search/search.controller';
import { UploadController } from './upload/upload.controller';

@Module({
  imports:[ServicesModule],
  controllers: [UserController, AuthController, CategoryController, ProductController, SearchController, UploadController]
})
export class ControllersModule {}
