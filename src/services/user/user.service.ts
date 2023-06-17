import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDTO } from 'src/dto/user.dto';
import { User } from 'src/schema/user.schema';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel:Model<User>){}

    async getUserTest(){
        return "Get user test";
    }

    async createNewUser(userDTO:UserDTO){
        const createdUser = await this.userModel.create(userDTO)
        return await createdUser.save();
    }
}
