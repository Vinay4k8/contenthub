import Store from "@/Models/StoreSchema";
import connectToDB from "@/lib/connectToDB";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"


export const POST=async(req:Request)=>{
    try{
        await connectToDB();
        const body=await req.json();
        const {name}=body
        const {userId}=auth();


        if(!userId){
            return new NextResponse("Unauthorized",{status:401})
        }
        if(!name){
            return new NextResponse("Name is Required",{status:400});
        }


        const store=await Store.create({
            userId,name
        })

        return NextResponse.json(store)
    }
    catch(error){
        console.log("[STORES_POST",error)
        return new NextResponse("Internal Error",{status:500})
    }
}