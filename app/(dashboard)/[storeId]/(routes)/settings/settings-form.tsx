"use client";
import Heading from '@/components/Heading';
import AlertModal from '@/components/Modals/alert-modal';
import ApiAlert from '@/components/api-alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useOrigin from '@/hooks/use-origin';
import { cn } from '@/lib/utils';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';


const SettingsForm = ({store}:{store:any}) => {

    const [name,setName]=useState(store?.name);
    const [URL,setURL]=useState(store.site_url || "");
    const [loading,setLoading]=useState(false);
    const params=useParams();
    const router=useRouter();
    const [open,setOpen]=useState(false);
    const origin=useOrigin();

    const changeName=async()=>{
        try {
            
            setLoading(true);
            if(URL.length>0){
            const store:any=await fetch(`/api/stores/${params.storeId}`,{method:"PATCH",body:JSON.stringify({name,site_url:URL})});
            }else{
            const store:any=await fetch(`/api/stores/${params.storeId}`,{method:"PATCH",body:JSON.stringify({name})});
            }
            router.refresh();
            toast.success("Store updated");
        } catch (error) {

            toast.error("Something went wrong . ")
            
        }finally{
            
            setLoading(false)
        }
    }


    const onDelete=async()=>{
        try {

            setLoading(true)
            const store=await fetch(`/api/stores/${params.storeId}`,{method:"DELETE"})
            if(store.status==200){
                router.refresh();
                router.push("/")
                toast.success("Store deleted");
            }else if(store.status==409){
                toast.error("Make sure you removed all products and categories first. ")
            }

        } catch (error) {
            toast.error("Make sure you removed all products and categories first. ")

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
  <div className='flex items-center justify-center'>
        <Heading title="Settings" description="Manage store preferences"/>
        <Button 
        size={'icon'}
        variant={'destructive'}
        className='ml-auto'
        disabled={loading}
        onClick={()=>{setOpen(true)}}
        >
            <Trash className='h-4 w-4' />
        </Button>
        </div>
        <hr className='my-2' />
    <div className='grid lg:grid-cols-3 grid-cols-1 space-y-4 lg:space-y-0 lg:space-x-5'>
        <div>

        <p className={cn((name.length<1 && "text-red-500"))}>Name</p>
        <Input
        placeholder='Enter store name'
        value={name} onChange={(e)=>setName(e.target.value)}
        disabled={loading}
        className='my-3'
        />
        </div>
        <div>
        <p>Frontend site url (For stripe checkout not mandate)</p>
        <Input
        placeholder='Enter store name'
        value={URL} onChange={(e)=>setURL(e.target.value)}
        disabled={loading}
        className='my-3'
        />
        </div>
       
     
    </div>
    <div className='max-w-fit'>
    <Button disabled={loading} onClick={changeName} className='block'>
        Save changes
       </Button>
    </div>
    <hr className='my-3'/>
        <div className='text-wrap'>
            <ApiAlert
            title={"NEXT_API_PUBLIC_URL"}
            variant='public'
            description={`${origin}/api/${params.storeId}`}
            />
        </div>
    </>
  )
}

export default SettingsForm