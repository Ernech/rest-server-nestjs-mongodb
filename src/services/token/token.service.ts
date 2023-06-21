import { Injectable } from '@nestjs/common';
import { User } from 'src/schema/user.schema';
import * as jwt from 'jsonwebtoken';
require('dotenv').config()
@Injectable()
export class TokenService {

    generateToken(id:string, role:string){
        const prievateKey = process.env.PRIVATE_KEY
        const now = Math.floor(Date.now() / 1000);
        const payload={
            role,
            id,
            iat: now,
        }
        return jwt.sign(prievateKey,payload,{expiresIn:'3h'})
    }
    

}
