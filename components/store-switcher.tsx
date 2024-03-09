"use client";

import { Check, ChevronsUpDown, PlusCircle, Store } from 'lucide-react';
import {Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { storeInterface } from '@/Models/StoreSchema';
import { useStoreModal } from '@/hooks/use-store-modal';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {CommandGroup, CommandSeparator, Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command';

type PopoverTriggerProps=React.ComponentPropsWithRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps{
  items?:storeInterface[]
}

const StoreSwitcher = ({
  className,
  items=[]
}:StoreSwitcherProps) => {
  const storeModal=useStoreModal();
  const params=useParams();
  const router=useRouter();

    const formattedItems=items.map((item)=>({
      label:item.name,
      value:item._id
    }))

    const currentStore=formattedItems.find((item)=>item.value===params.storeId);
    
    const [open,setOpen]=useState(false);
    const onStoreSelect=(store:{label:string,value:string})=>{
      setOpen(false);
      router.push(`/${store.value}`)
    }

  return (
    <Popover open={open } onOpenChange={setOpen}>
      <PopoverTrigger asChild>
          <Button 
          variant="outline"
          size={'sm'}
          role='combobox'
          aria-expanded={open}
          aria-label='Select a store'
          className={cn("w-[200px] justify-center",className)}
          >
            <Store className='mr-2 h-4 w-4' />
            {currentStore?.label}
            <ChevronsUpDown className='ml-auto h-4 w-4 shrink-0 opacity-50' />
          </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandList>
            <CommandInput placeholder='Search store' />
            <CommandEmpty>No store found</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedItems.map((store)=>(
                <CommandItem
                key={store.value}
                onSelect={()=>onStoreSelect(store)}
                className='text-sm my-2'
                >
                  <Store className='mr-2 h-4 w-4' />
                  {store.label}
                  <Check
                  className={cn("ml-auto h-4 w-4",currentStore?.value===store.value?
                  "opacity-100":
                  "opacity-0")}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator/>
            <CommandList>
              <CommandGroup>
              <CommandItem
              onSelect={()=>{
                setOpen(false);
                storeModal.onOpen();
              }}
              className='py-3 cursor-pointer my-3'
              >
                <PlusCircle className='mr-2 h-5 w-5'/>
                Create store
              </CommandItem>
                </CommandGroup>
            </CommandList>
          
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default StoreSwitcher