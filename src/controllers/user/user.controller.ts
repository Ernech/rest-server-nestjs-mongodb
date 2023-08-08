import { Body, Controller, Get, Post, Param, Put, Delete, Query } from '@nestjs/common';
import { Authorization } from 'src/decorators/auth.decorator';
import { Roles } from 'src/decorators/roles.decorator';

import { UserDTO } from 'src/dto/user.dto';
import { RoleType } from 'src/enums/role-type.enum';
import { UserService } from 'src/services/user/user.service';

@Controller('user')
export class UserController {

    constructor(private userService:UserService){}

    @Get()
    @Authorization(true)
    @Roles(RoleType.ADMIN)
    async getUsers(@Query('page') page:number=0, @Query('limit') limit:number=5){
        return this.userService.getUsers(page,limit);
    }

    @Get('/:id')
    @Authorization(true)
    async getUser(@Param('id') id:string){
        return this.userService.getUserByID(id);
    }

    @Post()
    @Authorization(true)
    async createUser(@Body() userDTO:UserDTO){
        return this.userService.createNewUser(userDTO);
    }

    @Put('/:id')
    @Authorization(true)
    async editUser(@Param('id')  id:string, @Body() userDTO:UserDTO){
            return this.userService.editUser(id,userDTO);
    }

    @Delete('/:id')
    @Authorization(true)
    @Roles(RoleType.ADMIN)
    async deleteUser(@Param('id') id:string){
        return this.userService.deleteUser(id);
    }

}
