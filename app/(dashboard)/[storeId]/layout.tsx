import Store from '@/Models/StoreSchema';
import Navbar from '@/components/navbar';
import connectToDB from '@/lib/connectToDB';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'

const DashboardLayout = async({
    children,params
}:{children:React.ReactNode,params:{storeId:string}}) => {

    const {userId}=auth();

    if(!userId){
        redirect("/sign-in");
    }
    await connectToDB();
    const store=await Store.find({id:params.storeId})

    if(!store){
        redirect("/");
    }

  return (
    <div className='overflow-x-hidden'>
        <Navbar/>
        <div>
        {children}
        </div>
    </div>
  )
}

export default DashboardLayout