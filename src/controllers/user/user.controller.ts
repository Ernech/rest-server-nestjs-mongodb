import { Controller, Get } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';

@Controller('user')
export class UserController {

    constructor(private userService:UserService){}

    @Get()
    async getUser(){
        return this.userService.getUserTest();
    }
}
