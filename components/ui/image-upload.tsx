"use client";

import { ImagePlus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./button";
import Image from "next/image";
import {CldUploadWidget} from "next-cloudinary"



interface ImageUploadProps{
    disabled?:boolean;
    onChange:(value:string)=>void;
    onRemove:(value:number)=>void;
    value:string[];
}

const ImageUpload:React.FC<ImageUploadProps>=({
    disabled,
    onChange,
    onRemove,
    value
})=>{

    const [isMounted,setIsMounted]=useState(false);

    useEffect(()=>{
        setIsMounted(true);
    },[])


    const onUpload=(result:any)=>{
        onChange(result.info.secure_url);
    }


    if(!isMounted){
        return null
    }


   
return <div>
 <div className="mb-4 flex items-center gap-4">
    {value.map((url,index)=>(
        <div key={url} 
        className="relative w-[200px] h-[300px] rounded-md overflow-hidden">
            <div className="z-10 absolute top-2 right-2" >
                <Button 
                onClick={()=>onRemove(index)}
                size={"icon"}
                variant={"destructive"}>
                <Trash className="h-4 w-4" />
                </Button>
            </div>
            <Image
            fill
            className="object-cover"
            alt="Image"
            src={url}
            />
        </div>

    ))}
 </div>
 <CldUploadWidget onUpload={onUpload} uploadPreset="jovcmbjm">
        {({open})=>{
            const onClick=()=>{
                open()
            }
            return(
                <Button
                type="button"
                variant={"secondary"}
                disabled={disabled}
                onClick={onClick}
                >
                    <ImagePlus className="h-4 w-4 mr-2" />
                    Upload image
                </Button>
            )
        }}
 </CldUploadWidget>
</div>
}


export default ImageUpload;