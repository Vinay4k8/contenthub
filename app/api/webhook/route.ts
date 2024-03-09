import OrderItem from "@/Models/OrderItemSchema"
import Order from "@/Models/OrderSchema"
import Product from "@/Models/ProductSchema"
import connectToDB from "@/lib/connectToDB"
import { stripe } from "@/lib/stripe"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"




export const POST=async(req:Request)=>{
const body=await req.text()
const signature=headers().get("Stripe-Signature") as string

let event:Stripe.Event;
try {
    event=stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
    )
} catch (error:any) {
    return new NextResponse(`Webhook error:${error.message}`,{status:500})
}
const session=event.data.object as Stripe.Checkout.Session;
const address=session?.customer_details?.address;

const addressComponents=[
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
];
const addressString=addressComponents.filter((c)=>c!=null).join(",");
if(event.type==="checkout.session.completed"){
await connectToDB();
const order=await Order.findByIdAndUpdate(session?.metadata?.orderId,
    {$set:{
        isPaid:true,
        address:addressString,
        phone:Number.parseInt(session?.customer_details?.phone!)
    },
})
const c1=await Product.countDocuments({});
const c2=await OrderItem.countDocuments({});
const PaidOrder=await Order.findById(session?.metadata?.orderId).populate({path:"orderItems",populate:{path:"productId"}});

const productData:any=PaidOrder.orderItems.map((item:any)=>({
    _id:item.productId._id,
    quantity:item.productId.quantity>0?item.productId.quantity-1:0,
    isArchived:(item.productId.quantity-1)==0?true:false,
}))

productData.forEach(async (product: any) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            product._id,
            {
                quantity: product.quantity,
                isArchived: product.isArchived
            }
        );
    } catch (error) {
        console.error('Error updating product:', error);
    }
});

}
return new NextResponse(null,{status:200})
}


// stripe listen --forward-to http://localhost:3000/api/webhook
