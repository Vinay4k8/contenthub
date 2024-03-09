import BillBoard from "@/Models/BillBoardSchema";
import Category from "@/Models/CategorySchema";
import Product from "@/Models/ProductSchema";
import Store from "@/Models/StoreSchema";
import connectToDB from "@/lib/connectToDB";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export const PATCH=async(req:Request,{params}:{params:{storeId:string}})=>{

    try {

        const body=await req.json();
        console.log(body)
        const {userId}=auth();

        if(!userId){
            return new NextResponse("Unauthorized",{status:401});
        }
        if(!body.name){
            return new NextResponse("Name is required",{status:400})
        }
        if(!params.storeId){
            return new NextResponse("Store id is required",{status:400})
        }
        await connectToDB();
        if(body.site_url.length>0){
            const store=await Store.findOneAndUpdate({_id:params.storeId,userId},{$set:{name:body.name,site_url:body.site_url}});
            return  NextResponse.json(store);
        }else{
            const store=await Store.findOneAndUpdate({_id:params.storeId,userId},{$set:{name:body.name}});
            return  NextResponse.json(store);
        }        
    } catch (error) {
        console.log("[STORE_PATCH]",error);
        return new NextResponse("Internal server error",{status:500});
    }
}


export const DELETE=async(req:Request,{params}:{params:{storeId:string}})=>{

    try {

        const {userId}=auth();
        const categories=await Category.find({storeId:params.storeId})
        const products=await Product.find({storeId:params.storeId})
        const billboards=await BillBoard.find({storeId:params.storeId})
        if(categories.length>0 || products.length>0 || billboards.length>0){
            return new NextResponse("Please delete everything in your store ",{status:409});
        }
        if(!userId){
            return new NextResponse("Unauthorized",{status:401});
        }
        if(!params.storeId){
            return new NextResponse("Store id is required",{status:400})
        }
        await connectToDB()
        const store=await Store.findOneAndDelete({_id:params.storeId,userId});
        return new NextResponse("Succesfull",{status:200});
        
    } catch (error) {
        console.log("[STORE_DELETE]",error);
        return new NextResponse("Internal server error",{status:500});
    }
}