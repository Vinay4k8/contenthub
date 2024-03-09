"use client";
import { BillBoardProps } from '@/Models/BillBoardSchema';
import Heading from '@/components/Heading';
import AlertModal from '@/components/Modals/alert-modal';
import { Button } from '@/components/ui/button';
import ImageUpload from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import useOrigin from '@/hooks/use-origin';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';



interface BillboardFormProps{
    billboard:BillBoardProps | null
}

const BillBoardForm = ({billboard}:BillboardFormProps) => {

    const [label,setLabel]=useState(billboard?.label?billboard.label:"");
    const [loading,setLoading]=useState(false);
    const params=useParams();
    const router=useRouter();
    const [open,setOpen]=useState(false);
    const origin=useOrigin();
    const [imageUrl ,setImageUrl]=useState(billboard?billboard?.imageUrl:"");


    const title= billboard?"Edit billboard":"Create billboard";
    const description=billboard?"Edit a billboard":"Create a billboard"; 
    const action=billboard?"Save changes":"Create";
    const toastMessage=billboard?"Billboard updated.":"Billboard created."


    const onSave=async()=>{
        try {
            if(label.length<=0 ){
                toast.error("Label cannot be empty")
                return;
            }
            if(imageUrl.length<=1){
                toast.error("Please upload image before saving")
                return;
            }
            setLoading(true);
            if(billboard){
                const BillBoardUpdated=await fetch(`/api/${params.storeId}/billboards/${billboard._id}`,{
                    method:"PATCH",body:JSON.stringify({imageUrl,label})
                })
            }else{

                const BillBoardCreated:any=await fetch(`/api/${params.storeId}/billboards`,{method:"POST",body:JSON.stringify({label,imageUrl})});
            }
            router.push(`/${params.storeId}/billboards`);
            router.refresh();
            toast.success(toastMessage);
        } catch (error) {

            toast.error("Something went wrong . ")
            
        }finally{
            
            setLoading(false)
        }
    }

    const onDelete=async()=>{
        try {

            setLoading(true)
            const {status}=await fetch(`/api/${params.storeId}/billboards/${billboard?._id}`,{method:"DELETE"})
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
            toast.error("Make sure you removed all categories using this billboard. ")

        }finally{
            setLoading(false)
            setOpen(false);
        }
    }




  return (<>
  <AlertModal
  isOpen={open}
  onClose={()=>setOpen(false)}
  onConfirm={()=>{onDelete()}}
  loading={loading}
  />
  <div className='flex items-center justify-between'>
        <Heading title={title} description={description}/>
     {billboard &&   <Button 
        size={'icon'}
        variant={'destructive'}
        className='ml-auto'
        disabled={loading}
        onClick={()=>{setOpen(true)}}
        >
            <Trash className='h-4 w-4' />
        </Button>}
        </div>
        <hr className='my-2' />
    <div className='grid grid-cols-3'>
        <div>
            <p className='tracking-tighter font-medium'>Background Image</p>
            <div>
                <ImageUpload
                value={imageUrl?[imageUrl]:[]}
                disabled={loading}
                onChange={(url)=>setImageUrl(url)}
                onRemove={()=>setImageUrl("")}
                />
            </div>
        <p className={"font-medium tracking-tighter mt-4"}>Label</p>
        <Input
        placeholder='Billboard label '
        value={label} onChange={(e)=>setLabel(e.target.value)}
        disabled={loading}
        className='my-5'
        />
       <Button disabled={loading} onClick={onSave} className='block mt-4'>
        {action}
       </Button>
        </div>
    </div>
    <hr className='my-3'/>
    </>
  )
}

export default BillBoardForm