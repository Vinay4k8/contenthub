import BillBoard from "@/Models/BillBoardSchema";
import Category from "@/Models/CategorySchema";
import Product from "@/Models/ProductSchema";
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




export const GET=async(req:Request,{params}:{params:{categoryId:string}})=>{

    try{
 
    if(!params.categoryId){
        return new NextResponse("Category id is required",{status:400})
    }
    await connectToDB()
    const billboard=await BillBoard.countDocuments({})
    const category=await Category.findById(params.categoryId).populate("billboardId");;

    return  NextResponse.json(category);

}
catch(error){
    console.log("[CATEGORY_GET]",error)
    return new NextResponse("Internal server error",{status:500});
}

}


export const PATCH=async(req:Request,{params}:{params:{storeId:string,categoryId:string}})=>{
try {
    const body=await req.json()
    const {name,propertys,billboardId}=body;
    const {userId}=auth();
    if(!userId){
        return new NextResponse(" Unauthenticated",{status:401})
    }
    
    if(!name){
        return new NextResponse("Label is required",{status:400})

    }

    if(!propertys){
        return new NextResponse("Image is required",{status:400})
    }
    if(!params.storeId){
        return new NextResponse("Store Id  is required",{status:400})
    }
    if(!billboardId){
        return new NextResponse("Billboard Id  is required",{status:400})
    }
    if(!params.categoryId){
        return new NextResponse("Category Id  is required",{status:400})
    }

    if(!await findStore(params?.storeId,userId)){
        return new NextResponse("Unauthorized",{status:403})
    }
    await connectToDB()
    const category=await Category.findByIdAndUpdate(params.categoryId,{$set:{name,value:propertys,billboardId}});
    return NextResponse.json(category)

} catch (error) {
    console.log("[CATEGORY_PATCH]",error);
    return new NextResponse("Internal server error",{status:500});
}
}



export const DELETE=async(req:Request,{params}:{params:{storeId:string,categoryId:string}})=>{

    try{
    const {userId}=auth();
    if(!userId){
        return new NextResponse("Unauthenticated",{status:401});
    }
    if(!params.categoryId){
        return new NextResponse("Category id is required",{status:400})
    }
    if(!params.storeId){
        return new NextResponse("Store Id  is required",{status:400})
    }
    await connectToDB()
    if(!await findStore(params?.storeId,userId)){
        return new NextResponse("Unauthorized",{status:403})
    }
    const products=await Product.find({storeId:params.storeId,categoryId:params.categoryId});
    if(products.length>0){
        return new NextResponse(null,{status:409});
    }
    const category=await Category.findByIdAndDelete(params.categoryId);
    return new  NextResponse(null,{status:200});
}
catch(error){
    console.log("[CATEGORY_DELETE]",error)
    return new NextResponse("Internal server error",{status:500});
}

}