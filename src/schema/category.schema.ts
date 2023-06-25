import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "./user.schema";


export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category{

    @Prop({required:[true,'name is required']})
    name:string;

    @Prop({default:true})
    status:boolean;

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User'})
    user:User;

}


export const CategorySchema = SchemaFactory.createForClass(Category);