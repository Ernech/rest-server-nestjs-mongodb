import { SetMetadata } from "@nestjs/common";


export const Authoization = (authorization:boolean)=>
     SetMetadata('authorizationRequired', authorization);
