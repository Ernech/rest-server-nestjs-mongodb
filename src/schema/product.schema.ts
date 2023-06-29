import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Category } from "./category.schema";
import { type } from "os";
import { User } from "./user.schema";

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product{


    @Prop({required:[true,"The product's name is required"]})
    name:string;

    @Prop({required:[true, "Price is required"], min:[0,"Price must be more than 0"]})
    price:number;

    @Prop()
    description:string;

    @Prop({default:true})
    available:boolean;

    @Prop({default:true})
    status:boolean;

    @Prop({type:mongoose.Schema.Types.ObjectId, ref:'Category'})
    category:Category

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User'})
    user:User;

}

export const ProductSchema = SchemaFactory.createForClass(Product);