import {Schema, model, models}  from "mongoose";


export interface storeInterface{
    name:string;
    userId:string;
    createdAt:string;
    updatedAt:string;
    _id:string;
}


const StoreSchema=new Schema({
    name:{type:String,required:true},
    userId:{type:String,required:true},
    site_url:{type:String},
    },{timestamps:true}
    )

const Store=models.store || model("store",StoreSchema);
export default Store;
