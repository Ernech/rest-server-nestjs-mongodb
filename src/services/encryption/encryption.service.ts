import { Injectable } from '@nestjs/common';
import *  as bcrypt from 'bcrypt';
@Injectable()
export class EncryptionService {

    async generatePassowd(password:string){
        
        const salt = await bcrypt.genSalt();
        const cryptedPassword = bcrypt.hash(password,salt);
        return cryptedPassword;

    }

    async comparePassword(password:string, cryptedPassword:string){
        return await bcrypt.compare(password,cryptedPassword); 
    }


}
