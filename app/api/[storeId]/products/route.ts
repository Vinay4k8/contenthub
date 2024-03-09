import Category from "@/Models/CategorySchema";
import Product, { ProductProps } from "@/Models/ProductSchema";
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
        const dummy=await Category.countDocuments({});
        const Products:ProductProps[]=await Product.find({storeId:params.storeId}).populate("categoryId");
        return  NextResponse.json(Products);
    
    } catch (error) {
        console.log("[PRODUCTS_GET]",error);
        return new NextResponse("Internal server error",{status:500});
    }
    }


export const POST=async(req:Request,{params}:{params:{storeId:string}})=>{
try {
    const body=await req.json()
    const {name,price,Images,categoryId,Propertys,isFeatured,isArchived,quantity}=body;
    const {userId}=auth();
    if(!userId){
        return new NextResponse(" Unauthenticated",{status:401})
    }
    
    if(!name){
        return new NextResponse("Name is required",{status:400})
    }
    if(!price){
        return new NextResponse("Price is required",{status:400})
    }
    if(Images.length<1){
        return new NextResponse("Images is required",{status:400})
    }
    if(!categoryId){
        return new NextResponse("Category id is required",{status:400})
    }
    if(!Propertys){
        return new NextResponse("Propertys are required",{status:400})
    }
    
    if(!params.storeId){
        return new NextResponse("Store Id  is required",{status:400})
    }

    if(!await findStore(params?.storeId,userId)){
        return new NextResponse("Unauthorized",{status:403})
    }
    if(quantity<0){
        return new NextResponse("The products cannot <1",{status:400})
    }
    if(quantity<1 && isArchived==false){
        return new NextResponse("The products <1 check isArchived",{status:400})
    }
    await connectToDB()
    const product=await Product.create({name,price,storeId:params.storeId,Images,
    categoryId,Propertys,isFeatured,
    isArchived,quantity
    });
    return  NextResponse.json(product)

} catch (error) {
    console.log("[PRODUCT_POST]",error);
    return new NextResponse("Internal server error",{status:500});
}
}



