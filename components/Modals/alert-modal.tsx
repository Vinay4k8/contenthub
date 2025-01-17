"use client";

import React, { useEffect, useState } from 'react'
import Modal from '../ui/Modal';
import { Button } from '../ui/button';


interface AlertModalProps{
    isOpen:boolean;
    onClose:()=>void;
    onConfirm:()=>void;
    loading:boolean;
}


const AlertModal :React.FC<AlertModalProps>= ({
    isOpen,
    onClose,
    onConfirm,
    loading,
}) => {
    const [isMounted,setMounted]=useState(false);
    useEffect(()=>{setMounted(true)},[])
    if(!isMounted){
        return null
    }
  return (
    <Modal
    title="Are you sure?."
    description='This action cannot be undone.'
    isOpen={isOpen}
    onClose={onClose}
    >
        <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
            <Button disabled={loading} variant={"outline"} onClick={onClose} >
                cancel
            </Button>
            <Button disabled={loading} variant={"destructive"} onClick={onConfirm} >
                Continue
            </Button>
        </div>
    </Modal>
  )
}

export default AlertModal