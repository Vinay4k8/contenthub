import BillBoard from "@/Models/BillBoardSchema";
import Category from "@/Models/CategorySchema";
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




export const GET=async(req:Request,{params}:{params:{billboardId:string}})=>{

    try{
 
    if(!params.billboardId){
        return new NextResponse("Billboard id is required",{status:400})
    }
    await connectToDB()
    const billboard=await BillBoard.findById(params.billboardId);

    return  NextResponse.json(billboard);

}
catch(error){
    console.log("[BILLBOARD_GET]",error)
    return new NextResponse("Internal server error",{status:500});
}

}


export const PATCH=async(req:Request,{params}:{params:{storeId:string,billboardId:string}})=>{
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
    if(!params.billboardId){
        return new NextResponse("Billboard Id  is required",{status:400})
    }

    if(!await findStore(params?.storeId,userId)){
        return new NextResponse("Unauthorized",{status:403})
    }
    await connectToDB()
    const billboard=await BillBoard.findByIdAndUpdate(params.billboardId,{$set:{label,imageUrl}});
    return NextResponse.json(billboard)

} catch (error) {
    console.log("[BILLBOARD_PATCH]",error);
    return new NextResponse("Internal server error",{status:500});
}
}



export const DELETE=async(req:Request,{params}:{params:{storeId:string,billboardId:string}})=>{

    try{
    const {userId}=auth();
    if(!userId){
        return new NextResponse("Unauthenticated",{status:401});
    }
    if(!params.billboardId){
        return new NextResponse("Billboard id is required",{status:400})
    }
    if(!params.storeId){
        return new NextResponse("Store Id  is required",{status:400})
    }
    await connectToDB()

    if(!await findStore(params?.storeId,userId)){
        return new NextResponse("Unauthorized",{status:403})
    }
    const categories=await Category.find({storeId:params.storeId,billboardId:params.billboardId})
    if(categories.length>0){
        return new NextResponse("Unauthorized",{status:409})
    }
    const billboard=await BillBoard.findByIdAndDelete(params.billboardId);
    return  NextResponse.json(null,{status:200});
}
catch(error){
    console.log("[BILLBOARD_DELETE]",error)
    return new NextResponse("Internal server error",{status:500});
}

}