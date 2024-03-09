import BillBoard from "@/Models/BillBoardSchema";
import Category, { CategoryProps } from "@/Models/CategorySchema";
import Store from "@/Models/StoreSchema";
import connectToDB from "@/lib/connectToDB";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export const findStore=async(storeId:string,userId:string)=>{
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
        const billboard=await BillBoard.countDocuments({})
        const categorys:CategoryProps[]=await Category.find({storeId:params.storeId}).populate("billboardId");
        return  NextResponse.json(categorys);
    
    } catch (error) {
        console.log("[CATEGORIES_GET]",error);
        return new NextResponse("Internal server error",{status:500});
    }
    }


export const POST=async(req:Request,{params}:{params:{storeId:string}})=>{
try {
    const body=await req.json()
    const {name,propertys,billboardId}=body;
    const {userId}=auth();
    if(!userId){
        return new NextResponse(" Unauthenticated",{status:401})
    }
    
    if(!name){
        return new NextResponse("Name is required",{status:400})

    }

    if(!billboardId){
        return new NextResponse("BillboardId is required",{status:400})
    }
    if(!params.storeId){
        return new NextResponse("Store Id  is required",{status:400})
    }

    if(!await findStore(params?.storeId,userId)){
        return new NextResponse("Unauthorized",{status:403})
    }
    await connectToDB()
    const category=await Category.create({name,value:propertys,storeId:params.storeId,billboardId});
    return  NextResponse.json(category)

} catch (error) {
    console.log("[CATEGORY_POST]",error);
    return new NextResponse("Internal server error",{status:500});
}
}



