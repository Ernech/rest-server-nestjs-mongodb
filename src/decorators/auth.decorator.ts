import { SetMetadata } from "@nestjs/common";


export const Authroization = (authorization:boolean)=>
     SetMetadata('authorizationRequired', authorization);
