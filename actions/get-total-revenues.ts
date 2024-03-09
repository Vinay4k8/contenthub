import OrderItem from "@/Models/OrderItemSchema";
import Order from "@/Models/OrderSchema"
import Product from "@/Models/ProductSchema"
import connectToDB from "@/lib/connectToDB";



interface GraphData{
    name:string;
    total:number;
}


export const getTotalRevenue=async(storeId:string)=>{
    await connectToDB();
    const products=await Product.countDocuments();
    const orderItems=await OrderItem.countDocuments();
    const paidOrders=await Order.find({storeId,isPaid:true}).populate({
        path: 'orderItems',
        populate: {
            path: 'productId',
            model: 'product'
        }
    })
   
    const totalRevenue=paidOrders.reduce((total,order)=>{
        const orderTotal=order.orderItems.reduce((orderSum:any,item:any)=>{
            return orderSum+item.productId.price;
        },0)
        return total+orderTotal;
    },0)
    const stockCount=await Product.countDocuments({storeId,isArchived:false});

    const monthlyRevenue:{[key:number]:number}={};
    for(const order of paidOrders){
        const month=order.createdAt.getMonth();
        let revenueForOrder=0;
        for(const item of order.orderItems){
            revenueForOrder=item.productId.price
        }
        monthlyRevenue[month]=(monthlyRevenue[month] || 0)+revenueForOrder;
    }
    const graphData:GraphData[]=[
        {name:"Jan",total:0},
        {name:"Feb",total:0},
        {name:"Mar",total:0},
        {name:"Apr",total:0},
        {name:"May",total:0},
        {name:"Jun",total:0},
        {name:"Jul",total:0},
        {name:"Aug",total:0},
        {name:"Sep",total:0},
        {name:"Oct",total:0},
        {name:"Nov",total:0},
        {name:"Dec",total:0},

    ]


    for(const month in monthlyRevenue){
        graphData[parseInt(month)].total=monthlyRevenue[parseInt(month)];
    }

    return {totalRevenue,salesCount:paidOrders.length,stockCount,graphData};
}