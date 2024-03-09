"use client";

import * as z from "zod";
import {useForm} from "react-hook-form";

import {useStoreModal} from '@/hooks/use-store-modal'
import Modal from '@/components/ui/Modal';
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import toast from "react-hot-toast";

const formSchema=z.object({
  name:z.string().min(1),
})



const StoreModal = () => {
  const storeModal=useStoreModal();

  const [loading,setLoading]=useState(false);


  const form=useForm<z.infer<typeof formSchema>>({
    resolver:zodResolver(formSchema),
    defaultValues:{
      name:"",
    },
  })

  const onSubmit=async(values:z.infer<typeof formSchema>)=>{
  // console.log(values)
  try{
    setLoading(true)
    const store=await fetch("/api/stores",{
      method:"POST",body:JSON.stringify(values)
     })
    const newStore=await store.json();
    window.location.assign(`/${newStore._id}`)

     }catch(error){

      toast.error("Something went wrong");
       console.log("[Store Form Error ]",error)
       
     }finally{
      setLoading(false)
    }

  }


  return (
    <Modal
    title={"Create Store"}
     description='Add a new store to manage products and categories'
     isOpen={storeModal.isOpen}
     onClose={storeModal.onClose}

    >
      <Form {...form}> 
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
          control={form.control}
          name="name"
          render={({field})=>(
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="E-commerce" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
            <div className="pt-6 flex space-x-2 items-center  justify-end">
              <Button disabled={loading} variant={"outline"} onClick={storeModal.onClose} >Cancel</Button>
              <Button disabled={loading} type="submit" >Continue</Button>
            </div>
          
        </form>
      </Form>
    </Modal>
  )
}

export default StoreModal
