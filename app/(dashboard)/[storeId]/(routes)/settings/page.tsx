import Store from '@/Models/StoreSchema';
import connectToDB from '@/lib/connectToDB';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'
import SettingsForm from './settings-form';

interface SettingsPageProps{
    params:{
        storeId:string;
    };
}

export const metadata={
    title:"Settings",
    description:"Manage your Store"
  }

const SettingsPage:React.FC<SettingsPageProps> =async ({params}) => {
    
    const {userId}=auth();

    if(!userId){
        redirect("/sign-in")
    }

    await connectToDB()
    const store=await Store.findOne({_id:params.storeId,userId});
    
   

    if(!store){
        redirect("/")
    }


  return (
    <div className='m-5'>
        <SettingsForm store={JSON.parse(JSON.stringify(store))}/>
    </div>
  )
}

export default SettingsPage