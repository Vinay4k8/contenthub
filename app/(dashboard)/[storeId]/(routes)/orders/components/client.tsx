"use client"

import Heading from '@/components/Heading'
import React from 'react'
import { OrderColumn, Columns } from './coloumns'
import { DataTable } from '@/components/ui/data-table'
import ApiAlert from '@/components/api-alert'
import useOrigin from '@/hooks/use-origin'
import { useParams } from 'next/navigation'
import { useMediaQuery } from 'react-responsive'



interface OrderClientProps{
  data:OrderColumn[]
}


const OrderClient:React.FC<OrderClientProps> = ({data}) => {

      const origin=useOrigin();
      const params=useParams();
      const columns=Columns();
      const isSmallScreen=useMediaQuery({minWidth:480});
  return (
    <div >
        <div className='flex items-center justify-between' >
            <Heading 
            title={`Orders (${data.length})`}
            description='Manage Orders for your store'
            />
           
        </div>
        <hr/>

        <div>
            <DataTable searchKey={"products"} columns={columns} data={data}/>
        </div>
        <hr/>
        <div className={`${isSmallScreen?"max-w-full":"max-w-[320px]"} `}>
          <p className='text-muted-foreground my-3'>Post request body should contain {`data:{productIds:[""]}`}</p>
          <ApiAlert
          title="POST"
          description={`${origin}/api/${params.storeId}/checkout`}
          variant='public'
          />
        </div>
    </div>
  )
}

export default OrderClient