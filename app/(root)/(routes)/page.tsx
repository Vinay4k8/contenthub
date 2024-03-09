"use client"
import { useStoreModal } from '@/hooks/use-store-modal'
import React, { useEffect, useState } from 'react'

const setUpPage = () => {

   const isOpen=useStoreModal((state)=>state.isOpen)
   const onOpen=useStoreModal((state)=>state.onOpen)
   useEffect(()=>{
    if(!isOpen){
      onOpen();
    }
   },[isOpen,onOpen])

   
 return(null)
}

export default setUpPage