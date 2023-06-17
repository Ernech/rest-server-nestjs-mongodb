import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

    async getUserTest(){
        return "Get user test";
    }
}
