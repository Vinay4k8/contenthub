import mongoose, { Schema, model, models } from "mongoose";



export interface ProductProps{
    _id:string
    name:string;
    price:number
    isFeatured:boolean
    isArchived:boolean
    Images:string[]
    Propertys:object[]
    storeId:string
    categoryId:any
    createdAt:Date
    updatedAt:Date
    quantity:number
}


const ProductSchema=new Schema({
name:{type:String,required:true},
price:{type:Number,required:true},
isFeatured:{type:Boolean,required:true},
isArchived:{type:Boolean,required:true},
quantity:{type:Number,default :0},
Images:{type:[String],required:true},
Propertys:{type:[Object],required:true},
storeId:{type:mongoose.Schema.Types.ObjectId,ref:"store"},
categoryId:{type:mongoose.Schema.Types.ObjectId,ref:"category"}

},
{timestamps:true})

const Product=models.product || model("product",ProductSchema)

export default Product;