import React from 'react'
import { OrderColumn } from './components/coloumns'
import {format} from "date-fns"
import Order from '@/Models/OrderSchema'
import OrderItem from '@/Models/OrderItemSchema'
import Product from '@/Models/ProductSchema'
import { formatter } from '@/lib/utils'
import OrderClient from './components/client'


const OrdersPage = async({params}:{params:{storeId:string}}) => {

  const c1=await OrderItem.countDocuments({});
  const c2=await Product.countDocuments({});
  const response=await Order.find({storeId:params.storeId}).populate({path:"orderItems",populate:{path:"productId"}}).sort({createdAt:-1});
  const orders=JSON.parse(JSON.stringify(response));

const formattedOrders:OrderColumn[]=orders.map((item:any)=>({
id:item._id,
phone:item.phone,
address:item.address,
paid:item.isPaid,
products:item.orderItems.map((item:any)=>item.productId.name).join(", "),
totalPrice:formatter.format(item.orderItems.reduce((total:any,item:any)=>{
return total+item.productId.price
},0)),
createdAt:format(item.createdAt,"MMMM do , yyyy"),
}))



  return (
    <div className='flex col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
      <OrderClient data={formattedOrders}/>
      </div>
    </div>
  )
}

export default OrdersPage