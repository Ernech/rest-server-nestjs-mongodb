import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { IsMongoId } from 'class-validator';
import { UserDTO } from 'src/dto/user.dto';
import { UserService } from 'src/services/user/user.service';

@Controller('user')
export class UserController {

    constructor(private userService:UserService){}

    @Get('/:id')
    @IsMongoId({message:'Is not a mongo id'})
    async getUser(@Param('id') id:string){
        return this.userService.getUserByID(id);
    }

    @Post()
    async createUser(@Body() userDTO:UserDTO){
        return this.userService.createNewUser(userDTO);
    }
}
