import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from 'src/dto/login.dto';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){}

    @Post()
    async loginUser(@Body() loginDTO:LoginDTO){
        return this.authService.login(loginDTO);
    }

}
