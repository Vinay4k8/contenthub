"use client"

import { BillBoardProps } from '@/Models/BillBoardSchema'
import Heading from '@/components/Heading'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { ProductColumn, Columns } from './[productId]/components/coloumns'
import { DataTable } from '@/components/ui/data-table'
import ApiList from '@/components/api-list'



interface ProductClientProps{
  data:ProductColumn[]
}


const ProductClient:React.FC<ProductClientProps> = ({data}) => {

    const router=useRouter();
    const params=useParams();
    const columns=Columns();

  return (
    <div >
        <div className='flex items-center justify-between' >
            <Heading 
            title={`Products (${data.length})`}
            description='Manage products for your store'
            />
            <Button
             onClick={()=>{router.push(`/${params.storeId}/products/new`)}}
            >
                <Plus className='mr-2 h-4 w-4' />
                Add new
            </Button>
        </div>
        <hr/>
        {/* data table */}
        <div>
            <DataTable searchKey={"name"} columns={columns} data={data}/>
        </div>
        <ApiList entityId='productId' entityName='products' />
    </div>
  )
}

export default ProductClient