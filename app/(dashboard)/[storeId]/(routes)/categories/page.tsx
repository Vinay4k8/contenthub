import React from 'react'
import CategoryClient from './components/client'
import { CatgeoryColumn } from './[categoryId]/components/coloumns'
import {format} from "date-fns"
import Category, { CategoryProps } from '@/Models/CategorySchema'
import BillBoard from '@/Models/BillBoardSchema'


const CategorysPage = async({params}:{params:{storeId:string}}) => {

  const response=await Category.find({storeId:params.storeId}).sort({createdAt:-1})
  const categorys=JSON.parse(JSON.stringify(response));
  const response2=await BillBoard.find({storeId:params.storeId}).sort({createdAt:-1})
  const billboards=JSON.parse(JSON.stringify(response2));

  const findBillBoard=(id:string)=>{
    const ans=billboards.filter((item:any)=>(item._id==id))
    return ans[0].label;
  }
const formattedCatgeorys:CatgeoryColumn[]=categorys.map((item:CategoryProps)=>({
id:item._id,
name:item.name,
billboard:findBillBoard(item.billboardId),
createdAt:format(item.createdAt,"MMMM do , yyyy"),
}))

  return (
    <div className='flex col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
      <CategoryClient data={formattedCatgeorys}/>
      </div>
    </div>
  )
}

export default CategorysPage