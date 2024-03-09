"use client";


import React, { useState } from 'react'
import { BillboardColumn } from './[billboardId]/components/coloumns';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import AlertModal from '@/components/Modals/alert-modal';
import ApiList from '@/components/api-list';


interface CellActionProps{
data:BillboardColumn
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
            router.push(`/${params.storeId}/billboards/${data.id}`)
        }

        const onDelete=async()=>{
            try {
    
                setLoading(true)
               const {status}= await fetch(`/api/${params.storeId}/billboards/${data.id}`,{method:"DELETE"});
               if(status==409){
                toast.error("Make sure you removed all categories using this billboard. ")
               }else if(status==200){
                toast.success("Billboard deleted");
               }else{
                    toast.error("Something went wrong")
               }
                router.push(`/${params.storeId}/billboards`)
                router.refresh();
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
        <DropdownMenuContent align='end' className="shadow-md z-20 rounded-md p-2 dark:bg-[#020817] bg-white  ">
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