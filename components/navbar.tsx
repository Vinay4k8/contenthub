import React from 'react'
import MainNav from '@/components/main-nav'
import { UserButton, auth } from '@clerk/nextjs'
import StoreSwitcher from './store-switcher'
import { redirect } from 'next/navigation'
import connectToDB from '@/lib/connectToDB'
import Store from '@/Models/StoreSchema'
import { ModeToggle } from './theme-toggle'
import MobileNav from './moblie-nav'

const Navbar = async() => {

    const {userId}=auth();

    if(!userId){
      redirect("/sign-in")
    }
    await connectToDB();
    const response=await Store.find({userId});
    const stores=JSON.parse(JSON.stringify(response))




  return (
    <div className='border-b px-6 py-4 flex items-center justify-center max-w-screen'>
        <MobileNav className='flex flex-col space-y-5 lg:hidden mx-5 max-w-fit my-5' stores={stores} />
        <div className='mx-5 hidden sm:block'>
          <StoreSwitcher items={stores} />
        </div>
        <MainNav className='hidden lg:flex flex-row items-center lg:space-x-6'/>
        <div className='ml-auto flex items-center space-x-4'>
          <ModeToggle/>
            <UserButton afterSignOutUrl='/' />
        </div>
    </div>
  )
}

export default Navbar