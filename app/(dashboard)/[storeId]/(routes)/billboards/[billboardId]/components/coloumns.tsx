"use client"

import { useMediaQuery } from 'react-responsive';
import { ColumnDef } from "@tanstack/react-table"
import CellAction from "../../cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillboardColumn = {
  id: string
  label: number
  createdAt:string
}
export const Columns=()=>{

  const isLargeScreen = useMediaQuery({ minWidth: 768 });
  if(isLargeScreen){
    const columns: ColumnDef<BillboardColumn>[] = [
      {
        accessorKey: "label",
        header: "Label",
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
    const columns: ColumnDef<BillboardColumn>[] = [
      {
        accessorKey: "label",
        header: "Label",
      },
      {
        id:"actions",
        cell:({row})=><CellAction data={row.original}/>
    
      },
    ]
    return columns;
  }

}
// export const columns: ColumnDef<BillboardColumn>[] = [
//   {
//     accessorKey: "label",
//     header: "Label",
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


