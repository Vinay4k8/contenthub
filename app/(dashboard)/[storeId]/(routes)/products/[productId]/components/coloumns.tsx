"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "../../cell-action"
import { useMediaQuery } from "react-responsive";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  id: string;
  name: string;
  price:number;
  isArchived:boolean;
  isFeatured:boolean;
  category:string;
  propertys:object[];
  createdAt:string
}

// export const columns: ColumnDef<ProductColumn>[] = [
//   {
//     accessorKey: "name",
//     header: "Name",
//   },
//   {
//     accessorKey: "price",
//     header: "Price",
//   },{
//     accessorKey: "category",
//     header: "Category",
//   },
//   {
//     accessorKey: "quantity",
//     header: "Quantity",
//   },
//   {
//     accessorKey: "isArchived",
//     header: "Archived",
//   },
//   {
//     accessorKey: "isFeatured",
//     header: "Featured",
//   },
//    {
//     accessorKey: "createdAt",
//     header: "Date",
//   },
//   {
//     id:"actions",
//     cell:({row})=><CellAction data={row.original}/>

//   },
// ]


export const Columns=()=>{

  const isLargeScreen = useMediaQuery({ minWidth: 768 });
  if(isLargeScreen){
     const columns: ColumnDef<ProductColumn>[] = [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "price",
        header: "Price",
      },{
        accessorKey: "category",
        header: "Category",
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
      },
      {
        accessorKey: "isArchived",
        header: "Archived",
      },
      {
        accessorKey: "isFeatured",
        header: "Featured",
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
     const columns: ColumnDef<ProductColumn>[] = [
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
