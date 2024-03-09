"use client"


import { useMediaQuery } from 'react-responsive';

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "../../components/cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CatgeoryColumn = {
  id: string
  name: number
  createdAt:string
  billboard:string
}




export const Columns=()=>{

  const isLargeScreen = useMediaQuery({ minWidth: 768 });
  if(isLargeScreen){
    const columns: ColumnDef<CatgeoryColumn>[] = [
      {
        accessorKey: "name",
        header: "Name",
      },{
     accessorKey:"billboard",
     header:"Billboard"
      },
      {
        accessorKey: "createdAt",
        header: "Date",
      },
      {
        id:"actions",
        cell:({row})=><CellAction data={row.original}/>
    
      },
    ]
    
    return columns;
  }else{
    const columns: ColumnDef<CatgeoryColumn>[] = [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        id:"actions",
        cell:({row})=><CellAction data={row.original}/>
    
      },
    ]
    
    return columns;
  }

}


// export const columns: ColumnDef<CatgeoryColumn>[] = [
//   {
//     accessorKey: "name",
//     header: "Name",
//   },{
//  accessorKey:"billboard",
//  header:"Billboard"
//   },
//   {
//     accessorKey: "createdAt",
//     header: "Date",
//   },
//   {
//     id:"actions",
//     cell:({row})=><CellAction data={row.original}/>

//   },
// ]

