"use client"


import StoreModal from '@/components/Modals/store-modal'
import React, { useEffect, useState } from 'react'

const StoreProvider = () => {
    const [isMounted,setMounted]=useState(false);
    useEffect(()=>{
        setMounted(true)
    },[])

    if(!isMounted){
        return null
    }
    
  return (
   <StoreModal/>
  )
}

export default StoreProvider