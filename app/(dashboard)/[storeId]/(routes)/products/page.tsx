import React from 'react'
import {  ProductColumn } from './[productId]/components/coloumns'
import {format} from "date-fns"
import Product, { ProductProps } from '@/Models/ProductSchema'
import { formatter } from '@/lib/utils'
import ProductClient from './client'
import connectToDB from '@/lib/connectToDB'
import Category from '@/Models/CategorySchema'

const ProductsPage = async({params}:{params:{storeId:string}}) => {

  connectToDB();
  const cateresponse=await Category.countDocuments({storeId:params.storeId})
  const response=await Product.find({storeId:params.storeId}).populate("categoryId").sort({createdAt:-1})
  const products=JSON.parse(JSON.stringify(response));

 
const formattedProducts:ProductColumn[]=products.map((item:ProductProps)=>({
id:item._id,
name:item.name,
price:formatter.format(item.price),
category:item.categoryId.name,
isFeatured:item.isFeatured,
isArchived:item.isArchived,
quantity:item.quantity,
createdAt:format(item.createdAt,"MMMM do , yyyy"),
}))

  return (
    <div className='flex col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
      <ProductClient data={formattedProducts}/>
      </div>
    </div>
  )
}

export default ProductsPage