import { SetMetadata } from "@nestjs/common";


export const Authorization = (authorization:boolean)=>
     SetMetadata('authorizationRequired', authorization);
