import mongoose, { Schema, model, models } from "mongoose";


export interface BillBoardProps{
    _id:string;
    storeId:string;
    label:string;
    imageUrl:string;
    updatedAt:string;
    createdAt:string;
}


const BillBoardSchema=new Schema({
    storeId:{type:mongoose.Schema.Types.ObjectId,ref:"store",required:true},
    label:{type:String,required:true},
    imageUrl:{type:String,required:true},
},{timestamps:true})



const BillBoard= models.billboard || model("billboard",BillBoardSchema);

export default BillBoard;
