import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';
require('dotenv').config();
@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGO_DB),
        MongooseModule.forFeature([{name:User.name, schema:UserSchema}])
      ],
})
export class DatabaseModule {}
