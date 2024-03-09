import mongoose, { Schema, model, models } from "mongoose";



const orderItemSchema=new Schema({
orderId:{type:mongoose.Schema.Types.ObjectId,ref:"order"},
productId:{type:mongoose.Schema.Types.ObjectId,ref:"product"},
},{timestamps:true})


const OrderItem=models.orderItem || model("orderItem",orderItemSchema)

export default OrderItem;