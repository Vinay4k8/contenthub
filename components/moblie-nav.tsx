"use client";


import React, { useState } from 'react'
import { AlignLeft,  X } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import MainNav from './main-nav';
import StoreSwitcher from './store-switcher';


const MobileNav = ({className,stores}:{className:string,stores:any}) => {

    const [open,setOpen]=useState(false);

    const onOpen=()=>setOpen(true)
    const onClose=()=>setOpen(false)

  return (
    <div>
        <button className='flex items-center gap-x-2 lg:hidden  w-auto rounded-full dark:bg-white dark:text-[#020817] bg-black border-transparent px-5 py-3 disabled:cursor-not-allowed disabled:opacity-50
        text-white font-semibold hover:opacity-75
        transition'
        onClick={onOpen}
        >
            <AlignLeft size={15} />
        </button>

        <Dialog open={open} as="div" className="relative z-40 lg:hidden" onClose={onClose} >
            <div className='fixed inset-0 bg-black bg-opacity-25'/>
            <div className='fixed inset-0 z-40 flex'>
                <Dialog.Panel className={"relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white dark:bg-[#020817] py-4 pb-6 shadow-xl"}>
                <div className='items-center justify-end px-4 flex'>
            <button 
            className='rounded-full flex justify-center bg-white dark:bg-[#020817] border shadow-md p-2 hover:scale-110 transition'
            onClick={onClose}
            >
            <X size={15} />
            </button> 
                </div>
                <div className='sm:hidden mx-5'>
                <StoreSwitcher items={stores} />
                </div>
                <MainNav className={className} />
                </Dialog.Panel>
            </div>
        
        </Dialog>
    </div>
  )
}

export default MobileNav