import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDTO } from 'src/dto/user.dto';
import { UserService } from 'src/services/user/user.service';

@Controller('user')
export class UserController {

    constructor(private userService:UserService){}

    @Get()
    async getUser(){
        return this.userService.getUserTest();
    }

    @Post()
    async createUser(@Body() userDTO:UserDTO){
        return this.userService.createNewUser(userDTO);
    }
}
