"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Code, Copy, Server } from "lucide-react";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";


interface ApiAlertProps{
    title:string;
    description:string;
    variant:"public" | "admin"
}


const TextMap:Record<string,BadgeProps["variant"]>={
    public:"secondary",admin:"destructive",
}


const ApiAlert:React.FC<ApiAlertProps>=({description,title,variant="public"})=>{


 const onCopy=()=>{
    navigator.clipboard.writeText(description)
    toast.success("Copied")
 }


    return(<Alert>
        <Server className="h-5 w-5" />
        <AlertTitle className="flex  items-center gap-3">
            {title}
        <Badge  variant={TextMap[variant]} className="capitalize">
            {variant}
        </Badge>
        </AlertTitle>
        <AlertDescription className="flex lg:flex-row flex-col space-y-4 lg:space-y-0 lg:items-center lg:justify-between lg:mx-2 mt-4 p-1  rounded-lg ">
            <p className="break-words relative rounded  px-[0.5rem] py-[0.4rem] pr-[0.2rem]  bg-muted  text-xs lg:text-base ">
            {description}
            </p>
            <Button  size={"icon"} onClick={onCopy} variant={"secondary"}>
                <Copy className="h-4 w-4" />
            </Button>
        </AlertDescription>

    </Alert>)
}


export default ApiAlert;