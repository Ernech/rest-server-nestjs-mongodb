import { BadRequestException, Injectable, NotFoundException, UploadedFile } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDTO } from 'src/dto/user.dto';
import { User } from 'src/schema/user.schema';
import { EncryptionService } from '../encryption/encryption.service';
import { uploadFile } from 'src/helpers/uploadFile';
import path from 'path';
import fs from 'fs';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel:Model<User>, private encryptionService:EncryptionService){}

    async getUserByID(id:string){
        const user =  await this.userModel.findOne({_id:id,state:true});
        if(!user) throw new BadRequestException('User not found')
        return user;
    }

    async getUserByEmail(email:string){
        
        return await this.userModel.findOne({email,state:true})
    }

    async getUsers(page:number, limit:number){
        return await this.userModel.find({state:true}).skip(page).limit(limit).exec();
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

    async updateUserImg(file:Express.Multer.File, id:string){
        const user = await  this.getUserByID(id);
       const fileName = await uploadFile(file,undefined,'users');
        if(user.img){
            const basePath = process.env.NODE_ENV ==='production'?'dist':'src';
            const pathImg = path.join(__dirname,`../../../${basePath}/files/users`,user.img);
            if(fs.existsSync(pathImg)){
                fs.unlinkSync(pathImg);
            }
        }
        user.img=fileName.toString();
        user.save();
        return user;
    }

}
