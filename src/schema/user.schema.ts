import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

    @Prop({required:[true,'Name is required']})
    name:string;

    @Prop({required:[true,'Email is required']})
    email:string;

    @Prop({required:[true,'Password is required']})
    password:string;

    @Prop({required:true, enum:['ADMIN_ROLE', 'USER_ROLE']})
    role:string

    @Prop()
    img:string;

    @Prop({default:true})
    state:boolean;

}


export const UserSchema = SchemaFactory.createForClass(User);