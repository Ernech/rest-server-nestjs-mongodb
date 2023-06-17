import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';
import { EncryptionService } from './encryption/encryption.service';

@Module({
  imports:[MongooseModule.forFeature([{name:User.name, schema:UserSchema}])],
  providers: [UserService, EncryptionService],
  exports:[UserService, EncryptionService]
})
export class ServicesModule {}
