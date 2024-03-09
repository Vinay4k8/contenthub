"use client";
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Edit, PlusCircle, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';


interface PropertysProps{
  propertys:any
  setPropertys:(e:any)=>void
  addProperty:()=>void
  pname:string
  pvalue:string
  setPName:(e:string)=>void
  setPValue:(e:string)=>void
}

const PropertysPage = ({propertys,setPropertys,pname,pvalue,addProperty,setPName,setPValue}:PropertysProps) => {


  const onEdit=(index:number)=>{
    const proper=propertys;
    setPName(proper[index].name)
    setPValue(proper[index].value);
    proper.splice(index,1);
    setPropertys(proper)
  }


  return (<>
          <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Key</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Edit</TableHead>
                    <TableHead>Delete</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {propertys && propertys.map((item:any,index:number)=>(
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.value}</TableCell>
                      <TableCell>
                        <Button variant={"secondary"} onClick={()=>onEdit(index)}>
                        <Edit className='h-4 w-4'/>
                        </Button>
                        </TableCell>
                        <TableCell>
                        <Button variant={"destructive"} onClick={() => {
                           const updatedPropertys = propertys.filter((_:any, i:number) => i !== index);
                             setPropertys(updatedPropertys);
                              }}>
                        <Trash className='h-4 w-4'/>
                        </Button>
                        </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
          </div>
          <div className='grid grid-cols-3 gap-x-7 my-4'>
            <div>
            <p className='font-medium text-xs sm:text-lg'>Enter key</p>
              <Input placeholder={"eg : Size"}value={pname} onChange={(e)=>setPName(e.target.value)}/>
            </div>
            <div>
              <p className='font-medium text-xs sm:text-lg'>Enter value</p>
              <Input placeholder='eg : xl , l , m , xs' value={pvalue} onChange={(e)=>setPValue(e.target.value)}/>
            </div>
          </div>
          <Button className='flex items-center justify-center gap-3 my-3'  onClick={addProperty}>
              Add Property
              <PlusCircle className='h-5 w-5' />
          </Button>
        </>
  )
}

export default PropertysPage