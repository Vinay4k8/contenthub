"use client"

import { BillBoardProps } from '@/Models/BillBoardSchema'
import Heading from '@/components/Heading'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { BillboardColumn, Columns } from './[billboardId]/components/coloumns'
import { DataTable } from '@/components/ui/data-table'
import ApiList from '@/components/api-list'



interface BillboardClientProps{
  data:BillboardColumn[]
}


const BillboardClient:React.FC<BillboardClientProps> = ({data}) => {

    const router=useRouter();
    const params=useParams();
    const columns=Columns();
    const tableData=data.map((item:any)=>({
      ...item,
      label:item.label.slice(0,15)+"..."
    }))

  return (
    <div >
        <div className='flex lg:items-center lg:flex-row flex-col lg:justify-between' >
            <Heading 
            title={`Billboard (${data.length})`}
            description='Manage billboards for your store'
            />
            <Button
            className='max-w-fit'
             onClick={()=>{router.push(`/${params.storeId}/billboards/new`)}}
            >
                <Plus className='mr-2 h-4 w-4' />
                Add new
            </Button>
        </div>
        <hr/>
        {/* data table */}
        <div>
            <DataTable searchKey={"label"} columns={columns} data={tableData}/>
        </div>
        <div >
        <ApiList entityId='billboardId' entityName='billboards' />
        </div>
    </div>
  )
}

export default BillboardClient