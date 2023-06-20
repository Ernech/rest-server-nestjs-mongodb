import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDTO } from 'src/dto/user.dto';
import { User } from 'src/schema/user.schema';
import { EncryptionService } from '../encryption/encryption.service';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel:Model<User>, private encryptionService:EncryptionService){}

    async getUserByID(id:string){
        return await this.userModel.findOne({_id:id,state:true});
    }

    async getAllUsers(){
        return await this.userModel.find({state:true})
    }

    async createNewUser(userDTO:UserDTO){
        userDTO.password = await this.encryptionService.generatePassowd(userDTO.password);
        const createdUser = await this.userModel.create(userDTO);
        return await createdUser.save();
    }



    async editUser(id:string, userDTO:UserDTO){

        const updatedUser = await this.userModel.findByIdAndUpdate(id, userDTO,{new:true});
        if(!updatedUser){
            throw new NotFoundException(`Sorry, the user with the id ${id} does'n exists`)
        }
        return updatedUser;
    
    }


    async deleteUser(id:string){
        const deletedUser = await this.userModel.findByIdAndUpdate(id, {state:false},{new:true});
        if(!deletedUser){
            throw new NotFoundException(`Sorry, the user with the id ${id} does'n exists`)
        }
        return deletedUser;
    }


}
