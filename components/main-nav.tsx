"use client"
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React from 'react'

const MainNav = ({className,...props}:React.HtmlHTMLAttributes<HTMLElement>) => {
    
    const pathName=usePathname();
    const params=useParams();


    const routes=[{
        label:"OverView",
        href:`/${params.storeId}/`,
        active:pathName===`/${params.storeId}`
    },
    {
      label:"BillBoards",
      href:`/${params.storeId}/billboards`,
      active:pathName.includes(`/${params.storeId}/billboards`)
    },
   {
     label:"Categories",
     href:`/${params.storeId}/categories`,
      active:pathName.includes(`/${params.storeId}/categories`)
    },
    {
      label:"Products",
      href:`/${params.storeId}/products`,
      active:pathName.includes(`/${params.storeId}/products`)
    },
    {
      label:"Orders",
      href:`/${params.storeId}/orders`,
      active:pathName.includes(`/${params.storeId}/orders`)
    },
   {
     label:"Settings",
     href:`/${params.storeId}/settings`,
      active:pathName.includes(`/${params.storeId}/settings`)
    }
]


  return (
    <nav
    // className={cn("flex  lg:flex-row flex-col space-y-5 lg:space-y-0 lg:items-center lg:space-x-6",className)}
    className={className}
    >
    {routes.map((route)=>(
        <Link key={route.href}
         href={route.href}
         className={cn("text-sm font-medium transition-colors hover:text-primary relative after:w-2  after:h-[2px] after:bg-white dark:after:bg-black after:absolute after:-bottom-0 after:left-0",
         route.active?"text-black dark:text-white after:w-[100%] after:bg-black   dark:after:bg-white after:duration-300 after:transition-all":"text-muted-foreground"
         )}
         >
        {route.label}
        </Link>
    ))}
    </nav>
  );
}

export default MainNav

