import { Injectable } from '@nestjs/common';
import { User } from 'src/schema/user.schema';
import * as jwt from 'jsonwebtoken';
require('dotenv').config()
@Injectable()
export class TokenService {

    generateToken(id:string, role:string){
        const privateKey = process.env.PRIVATE_KEY
        const now = Math.floor(Date.now() / 1000);
        const payload={
            role,
            id,
            iat: now,
        }
        return jwt.sign(payload,privateKey,{expiresIn:'3h'})
    }
    getRoles(token:String){
        const tokenArray = token.split(' ');
        const {role} = this.validateToken(tokenArray[1])
        return role;
    }
    validateToken(token:string){
        return jwt.verify(token, process.env.PRIVATE_KEY)
    }
    

}
