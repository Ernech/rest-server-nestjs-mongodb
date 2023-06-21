import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { TokenService } from '../token/token.service';
import { LoginDTO } from 'src/dto/login.dto';
import { UserService } from '../user/user.service';
import { EncryptionService } from '../encryption/encryption.service';

@Injectable()
export class AuthService {

    constructor(private tokenService:TokenService, private userService:UserService, private encryptionService:EncryptionService){}


    async login(loginDTO:LoginDTO){
        const user = await this.userService.getUserByEmail(loginDTO.email);
        if(!user){
            throw new NotFoundException("The email is worng");
        }

        const verifyPassword = await this.encryptionService.comparePassword(loginDTO.password, user.password);
        
        if(!verifyPassword){
            throw new UnauthorizedException("The Password is incorrect");
        }

        const token= this.tokenService.generateToken(user._id.toString(),user.role);
        return {token};


    }



}
