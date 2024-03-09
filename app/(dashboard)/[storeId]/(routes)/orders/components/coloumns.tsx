"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action"
import { useMediaQuery } from "react-responsive"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderColumn = {
  id:string,
  phone:string,
  address:string,
  paid:boolean,
  products:string,
  totalPrice:number,
  createdAt:Date
}

// export const columns: ColumnDef<OrderColumn>[] = [
//   {
//     accessorKey: "products",
//     header: "Products",
//   },
//   {
//     accessorKey: "phone",
//     header: "Phone",
//   },
//   {
//     accessorKey: "address",
//     header: "Address",
//   },
//   {
//     accessorKey: "totalPrice",
//     header: "Total Price",
//   },
//   {
//     accessorKey: "paid",
//     header: "Is Paid",
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
export const Columns=()=>{

  const isLargeScreen = useMediaQuery({ minWidth: 1024 });
  if(isLargeScreen){
     const columns: ColumnDef<OrderColumn>[] = [
      {
        accessorKey: "products",
        header: "Products",
      },
      {
        accessorKey: "phone",
        header: "Phone",
      },
      {
        accessorKey: "address",
        header: "Address",
      },
      {
        accessorKey: "totalPrice",
        header: "Total Price",
      },
      {
        accessorKey: "paid",
        header: "Is Paid",
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
     const columns: ColumnDef<OrderColumn>[] = [
      {
        accessorKey: "products",
        header: "Products",
      },
      {
        id:"actions",
        cell:({row})=><CellAction data={row.original}/>
    
      }
    ]
    return columns;
  }

}
