import React from 'react'
import BillboardClient from './client'
import BillBoard, { BillBoardProps } from '@/Models/BillBoardSchema'
import { BillboardColumn } from './[billboardId]/components/coloumns'
import {format} from "date-fns"


const BillBoardsPage = async({params}:{params:{storeId:string}}) => {

  const response=await BillBoard.find({storeId:params.storeId}).sort({createdAt:-1})
  const billboards=JSON.parse(JSON.stringify(response));

const formattedBillboards:BillboardColumn[]=billboards.map((item:BillBoardProps)=>({
id:item._id,
label:item.label,
createdAt:format(item.createdAt,"MMMM do , yyyy"),
}))

  return (
    <div className='flex col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
      <BillboardClient data={formattedBillboards}/>
      </div>
    </div>
  )
}

export default BillBoardsPage