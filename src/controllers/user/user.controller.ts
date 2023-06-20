import { Body, Controller, Get, Post, Param, Put, Delete, Query } from '@nestjs/common';

import { UserDTO } from 'src/dto/user.dto';
import { UserService } from 'src/services/user/user.service';

@Controller('user')
export class UserController {

    constructor(private userService:UserService){}

    @Get()
    async getUsers(@Query('page') page:number=0, @Query('limit') limit:number=5){
        return this.userService.getUsers(page,limit);
    }

    @Get('/:id')
    async getUser(@Param('id') id:string){
        return this.userService.getUserByID(id);
    }

    @Post()
    async createUser(@Body() userDTO:UserDTO){
        return this.userService.createNewUser(userDTO);
    }

    @Put('/:id')
    async editUser(@Param('id')  id:string, @Body() userDTO:UserDTO){
            return this.userService.editUser(id,userDTO);
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id:string){
        return this.userService.deleteUser(id);
    }

}
