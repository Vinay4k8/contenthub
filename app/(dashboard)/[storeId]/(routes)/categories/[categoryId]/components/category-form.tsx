"use client";
import { BillBoardProps } from '@/Models/BillBoardSchema';
import { CategoryProps } from '@/Models/CategorySchema';
import Heading from '@/components/Heading';
import AlertModal from '@/components/Modals/alert-modal';
import MainSelect from '@/components/main-select';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import PropertysPage from './propertys';
import { Input } from '@/components/ui/input';



interface CategoryFormProps{
    category:CategoryProps | null;
    billboards:[BillBoardProps] | null;
}

const CategoryForm = ({category,billboards}:CategoryFormProps) => {

    const [name,setName]=useState(category?category.name:"");
    const [loading,setLoading]=useState(false);
    const params=useParams();
    const router=useRouter();
    const [open,setOpen]=useState(false);
    

    const title= category?"Edit category":"Create category";
    const description=category?"Edit a category":"Create a category"; 
    const action=category?"Save changes":"Create";
    const toastMessage=category?"Category updated.":"Category created."


    const onSave=async()=>{
        try {
            if(name.length<=0 ){
                toast.error("Label cannot be empty")
                return;
            }
           
            setLoading(true);
            const formate=propertys?.map((item)=>({
                name:item.name,
                value:item.value.split(",")
            }))
            
            if(category){
                const CategoryUpdated=await fetch(`/api/${params.storeId}/categories/${category._id}`,{
                    method:"PATCH",body:JSON.stringify({name,propertys:formate,billboardId})
                })
            }else{

                const CategoryCreated:any=await fetch(`/api/${params.storeId}/categories`,{method:"POST",body:JSON.stringify({name,propertys:formate,billboardId})});
            }
            router.push(`/${params.storeId}/categories`);
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
            const {status}=await fetch(`/api/${params.storeId}/categories/${category?._id}`,{method:"DELETE"})
            if(status==409){
                toast.error("Make sure you removed all products using this category. ")
               }else if(status==200){
                toast.success("Category deleted");
               }else{
                    toast.error("Something went wrong")
               }
            router.push(`/${params.storeId}/categories`)
            router.refresh();

        } catch (error) {
            toast.error("Make sure you removed all products using this billboard. ")

        }finally{
            setLoading(false)
            setOpen(false);
        }
    }


    const formattedBillboards=billboards?.map((item)=>({
        id:item._id,
        name:item.label,
    }
    ))
    
    
    const [billboardId,setBillBoardId]=useState(category?category.billboardId._id:(formattedBillboards?formattedBillboards[0]?.id:null))
    

    const formattedPropertys=category && category?.value.map((item)=>({
        name:item.name,
        value:item.value.join(",")
    }))

    const [propertys,setPropertys]=useState(category?formattedPropertys:null)
    const [pname,setPName]=useState("")
    const [pvalue,setPValue]=useState("")

    const addProperty=()=>{
        const prope=propertys?propertys:[]
        prope?.push({name:pname,value:pvalue})
        setPName("");
        setPValue("");
        setPropertys(prope)
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
     {category &&   <Button 
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
    <div className='grid md:grid-cols-3 grid-cols-1 gap-x-5'>
        <div>
        <p className={"font-medium tracking-tighter my-4"}>Name</p>
        <Input
         placeholder='Category name '
         value={name} onChange={(e)=>setName(e.target.value)}
        />
        </div>
        <div>
        <p className={"font-medium tracking-tighter my-4"}>Billboard</p>
        <MainSelect onChange={(e)=>setBillBoardId(e)} defaultValue={""}
         data={formattedBillboards} placeholderValue={`${!category?'BillBoards':category?.billboardId.label}`} />
        </div>
    </div>
    <div className='my-5' >
            <Heading
            title="Property's"
            description='Insert propertys for filter' 
            />
            <hr className='my-3'/>
        <PropertysPage 
        propertys={propertys}
        setPropertys={setPropertys}
        addProperty={addProperty}
         pname={pname}
        pvalue={pvalue}
        setPName={setPName}
        setPValue={setPValue}
        />
    </div>
    <hr className='my-3'/>
    <Button disabled={loading} onClick={onSave} className='block mt-4'>
        {action}
       </Button>
    </>
  )
}

export default CategoryForm