"use client"

import Heading from '@/components/Heading'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { CatgeoryColumn, Columns } from '../[categoryId]/components/coloumns'
import { DataTable } from '@/components/ui/data-table'
import ApiList from '@/components/api-list'



interface CategoryClientProps{
  data:CatgeoryColumn[]
}


const CategoryClient:React.FC<CategoryClientProps> = ({data}) => {

    const router=useRouter();
    const params=useParams();
    const columns=Columns();
  return (
    <div >
        <div className='flex lg:items-center lg:flex-row flex-col lg:justify-between' >
            <Heading 
            title={`Categories (${data.length})`}
            description='Manage categorys for your store'
            />
            <Button
            className='max-w-fit'
             onClick={()=>{router.push(`/${params.storeId}/categories/new`)}}
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
        <ApiList entityId='categoryId' entityName='categorys' />
    </div>
  )
}

export default CategoryClient