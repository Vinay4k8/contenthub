import mongoose, { Schema, model, models } from "mongoose";
import { boolean } from "zod";




const orderSchema=new Schema({
    storeId:{type:mongoose.Schema.Types.ObjectId,ref:"store",required:true},
    orderItems:[{ type: mongoose.Schema.Types.ObjectId, ref: "orderItem", required: true }],
    isPaid:{type:Boolean,required:true,default:false},
    address:{type:String},
    phone:{type:Number},

},{timestamps:true})

const Order=models.order || model("order",orderSchema);

export default Order;