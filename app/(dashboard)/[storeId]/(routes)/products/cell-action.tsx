"use client";


import React, { useState } from 'react'
import { ProductColumn } from './[productId]/components/coloumns';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import AlertModal from '@/components/Modals/alert-modal';


interface CellActionProps{
data:ProductColumn
}

const CellAction:React.FC<CellActionProps> = ({data}) => {


        const router=useRouter();
        const params=useParams();
        const [loading,setLoading]=useState(false);
        const [open,setOpen]=useState(false);

        const onCopy=()=>{
            navigator.clipboard.writeText(data.id)
            toast.success("Copied sucessfully")
        }

        const onUpdate=()=>{
            router.push(`/${params.storeId}/products/${data.id}`)
        }

        const onDelete=async()=>{
            try {
                setLoading(true)
                await fetch(`/api/${params.storeId}/products/${data.id}`,{method:"DELETE"})
                router.push(`/${params.storeId}/products`)
                router.refresh();
                toast.success("Product deleted");
            } catch (error) {
    
            }finally{
                setLoading(false)
                setOpen(false);
            }
        }
    
    
  return (
    <>
    <AlertModal
    isOpen={open}
    loading={loading}
    onClose={()=>setOpen(false)}
    onConfirm={onDelete}
    />
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button className='h-8 w-8 p-1' variant={"ghost"}>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='bg-white dark:bg-[#020817] shadow-md z-20 rounded-md p-2'>
            <DropdownMenuLabel className='font-medium text-base my-2 mx-1'>
                Actions
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='flex gap-1 my-1 p-1 cursor-pointer' onClick={onCopy}>
                <Copy className='h-4 w-4 mr-2'/>
                Copy Id
            </DropdownMenuItem>
             <DropdownMenuItem className='flex gap-1 my-1 p-1 cursor-pointer' onClick={onUpdate}>
                <Edit className='h-4 w-4 mr-2'/>
                Update
            </DropdownMenuItem>
             <DropdownMenuItem className='flex my-1 gap-1 p-1 cursor-pointer' onClick={()=>setOpen(true)}>
                <Trash className='h-4 w-4 mr-2'/>
                Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
   
    </>
  )
}

export default CellAction