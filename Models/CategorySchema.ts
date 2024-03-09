import mongoose, { Schema, model, models } from "mongoose";
import { BillBoardProps } from "./BillBoardSchema";


export interface CategoryProps{
    _id:string;
    name:string;
    value:[{name:String,value:[String]}];
    billboardId:any;
    storeId:string;
    createdAt:Date;
    updatedAt:Date;
}


const CategorySchema=new Schema({
name:{type:String,required:true},
storeId:{type:mongoose.Schema.Types.ObjectId,ref:"store",required:true},
billboardId:{type:mongoose.Schema.Types.ObjectId,ref:"billboard",required:true},
value:{type:[{name:String,value:[String]}],required:true},
},{timestamps:true})


const Category= models.category || model("category",CategorySchema);

export default Category;