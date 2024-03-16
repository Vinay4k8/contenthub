import BillBoard, { BillBoardProps } from "@/Models/BillBoardSchema";
import Store from "@/Models/StoreSchema";
import connectToDB from "@/lib/connectToDB";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


const findStore=async(storeId:string,userId:string)=>{
try {
const store=await Store.find({_id:storeId,userId})

if(store)
 return true
else
 return false    

} catch (error) {
    return false
}
}




export const GET=async(req:Request,{params}:{params:{storeId:string}})=>{
    try {
        if(!params.storeId){
            return new NextResponse("Store Id  is required",{status:400})
        }
        await connectToDB()
        const billboards:BillBoardProps[]=await BillBoard.find({storeId:params.storeId});
        return  NextResponse.json(billboards);
    
    } catch (error) {
        console.log("[BILLBOARDS_GET]",error);
        return new NextResponse("Internal server error",{status:500});
    }
    }


export const POST=async(req:Request,{params}:{params:{storeId:string}})=>{
try {
    const body=await req.json()
    const {label,imageUrl}=body;
    const {userId}=auth();
    if(!userId){
        return new NextResponse(" Unauthenticated",{status:401})
    }
    
    if(!label){
        return new NextResponse("Label is required",{status:400})

    }

    if(!imageUrl){
        return new NextResponse("Image is required",{status:400})
    }
    if(!params.storeId){
        return new NextResponse("Store Id  is required",{status:400})
    }

    if(!await findStore(params?.storeId,userId)){
        return new NextResponse("Unauthorized",{status:403})
    }
    await connectToDB()
    const billboard=await BillBoard.create({label,imageUrl,storeId:params.storeId});
    return  NextResponse.json(billboard)

} catch (error) {
    console.log("[BILLBOARD_POST]",error);
    return new NextResponse("Internal server error",{status:500});
}
}



