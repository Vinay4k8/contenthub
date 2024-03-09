import React from 'react'


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

interface MainSelectProps{
    placeholderValue:string;
    onChange:(id:any)=>void;
    defaultValue:string | null | any
    data:any ;
}


const MainSelect:React.FC<MainSelectProps> = ({placeholderValue,data,defaultValue,onChange}) => {
  return (
    <div>
        <Select onValueChange={(e)=>onChange(e)} >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={placeholderValue} />
            </SelectTrigger>
            <SelectContent>
                {data && data.map((item:any)=>(
                    <SelectItem key={item.id} value={item.id}>
                        {item.name.length>35?item.name.slice(0,35)+"...":item.name}
                    </SelectItem>
                ))}
                </SelectContent>
        </Select>
    </div>
  )
}

export default MainSelect