import Store, { storeInterface } from '@/Models/StoreSchema';
import connectToDB from '@/lib/connectToDB';
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation';
import React from 'react'

const setupLayout = async({
    children
}:{
    children:React.ReactNode
}) => {

    const {userId}=auth();

    if(!userId){
        redirect("/sign-in")
    }

    await connectToDB();
    const store=await Store.findOne({userId:userId});
    

    if(store){
        redirect(`/${store.id}`)
    }

  return (
    <div>
        {children}
    </div>
  )
}

export default setupLayout