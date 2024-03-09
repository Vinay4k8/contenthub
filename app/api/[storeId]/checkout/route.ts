
import Stripe from "stripe";
import {stripe} from "@/lib/stripe";
import connectToDB from "@/lib/connectToDB";
import { NextResponse } from "next/server";
import Product from "@/Models/ProductSchema";
import { ObjectId } from "mongodb";
import Order from "@/Models/OrderSchema";
import OrderItem from "@/Models/OrderItemSchema";
import Store from "@/Models/StoreSchema";

const corsHeaders={
    "Access-Control-Allow-Origin":"*",
    "Access-Control-Allow-Methods":"GET,POST,DELETE,PUT,OPTIONS",
    "Access-Control-Allow-Headers":"Content-Type,Authorization",
}


export async function OPTIONS(){
    return NextResponse.json({},{headers:corsHeaders})
}

export const POST=async(
    req:Request,
    {params}:{params:{storeId:string}}
)=>{
try{
    const {data} =await req.json()
    const {productIds}=data
if(!productIds || productIds.length==0){
    return new NextResponse("Product ids are required",{status:400})
}

connectToDB();

const productIdsAsObjectIds = productIds.map((id:string) => new ObjectId(id));


const products = await Product.find({ _id: { $in: productIdsAsObjectIds } });


const line_items:Stripe.Checkout.SessionCreateParams.LineItem[]=[];


products.forEach((product)=>{
    line_items.push({
        quantity:1,
        price_data:{
            currency:"INR",
            product_data:{
                name:product.name,
            },
            unit_amount:product.price*100
        }
    })
})

const orderItems = await OrderItem.create(productIds.map((productId:string )=> ({ productId })));


const orderItemIds = orderItems.map((orderItem:any) => orderItem._id);

const order =await Order.create({
    storeId: params.storeId,
    isPaid: false,
    orderItems: orderItemIds
});
const store= await Store.findById(params.storeId);
const session=await stripe.checkout.sessions.create({
    line_items:line_items,
    mode:"payment",
    billing_address_collection:"required",
    phone_number_collection:{
        enabled:true
    },
    success_url:`${store.site_url}/cart?success=1`,
    cancel_url:`${store.site_url}/cart?canceled=1`,
    metadata:{
        orderId:order._id.toString()
    }
})
return NextResponse.json({url:session.url},{
    headers:corsHeaders
})
}catch(error){
    console.log("[CHECKOUT_POST ]",error);
    return new NextResponse("Internal server error",{status:500})
}


}
