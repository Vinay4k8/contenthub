"use client";
import { CategoryProps } from '@/Models/CategorySchema';
import { ProductProps } from '@/Models/ProductSchema';
import Heading from '@/components/Heading';
import AlertModal from '@/components/Modals/alert-modal';
import MainSelect from '@/components/main-select';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import ImageUpload from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';



interface ProductFormProps{
    product:ProductProps | null
    categorys:CategoryProps[] | null 
}

const ProductForm = ({product,categorys}:ProductFormProps) => {

    const [Product,setProduct]=useState({
        Propertys:product?product.Propertys : [],
    });
    const [price,setPrice]=useState(product?.price || 0);
    const [category,setCategory]=useState(product?.categoryId?._id || "");

    const initialProperty=()=>{
        const prop:any=categorys?.filter((item)=>{
            if(item._id!==category) return false;
            return true
        })
        return prop[0].value;
    }


    const [isArchived,setIsArchieved]=useState(product?product.isArchived : false)
    const [quantity,setQuantity]=useState(product?.quantity?product.quantity : 1)
    const [isFeatured,setIsFeatured]=useState(product?product.isFeatured : false)
    const [propertys,setPropertys]=useState(product?initialProperty():[])
    const [loading,setLoading]=useState(false);
    const params=useParams();
    const router=useRouter();
    const [open,setOpen]=useState(false);
    const [Images ,setImages]=useState(product?.Images || []);
    const [name,setName]=useState(product?product.name:"")


    const title= product?"Edit product":"Create product";
    const description=product?"Edit a product":"Create a product"; 
    const action=product?"Save changes":"Create";
    const toastMessage=product?"Product updated.":"Product created."



    const PropertysMatch=()=>{
        try {

        const propertysCheck=Product.Propertys;
        const categoryPropertys:any=categorys?.filter((item)=>(item._id===category))
        if(categoryPropertys && categoryPropertys?.length<1){
            toast.error("Please choose a Category")
            return false;
        }
        console.log(propertysCheck.length,categoryPropertys)
        if( propertysCheck && propertysCheck.length!==categoryPropertys[0].value.length){
            const missPropertys=categoryPropertys[0].value.filter((p:any)=>{
                const found=propertysCheck.filter((pc:any)=>(p.name===pc.name))
                if(found.length<1){
                    return true}
                return false
            })
            const format=missPropertys.map((item:any)=>(item.name))
            toast.error(`Missing Propertys ${format}`)
            return false
        }
        
        return true;            
    } catch (error) {
        console.log("Something went wrong",error)
        return false;
    }
    }


    const onSave=async()=>{
        try {
            if(name.length <1){
                toast.error("Name cannot be empty")
                return;
            }
            if(!price){
                toast.error("Price cannot be empty")
                return;
            }
            if(Images.length<1){
                toast.error("Please upload images before saving")
                return;
            }
            if(quantity<1 && isArchived==false){
                toast.error("Please tick isArchived quantity < 1")
                return;
            }
            if(!PropertysMatch()) return;
            setLoading(true);
            const data={
                name:name,
                price:price,
                Images:Images,
                isArchived:isArchived,
                isFeatured:isFeatured,
                categoryId:category,
                Propertys:Product.Propertys,
                quantity
            }
            if(product){
               console.log(data);
                const productUpdated=await fetch(`/api/${params.storeId}/products/${product._id}`,{
                    method:"PATCH",body:JSON.stringify(data)
                })
            }else{

                const productcreated:any=await fetch(`/api/${params.storeId}/products`,{method:"POST",body:JSON.stringify(data)});
            }
            router.push(`/${params.storeId}/products`);
            router.refresh();
            toast.success(toastMessage);
        } catch (error) {

            toast.error("Something went wrong . ")
            
        }finally{
            
            setLoading(false)
        }
    }





    const onDelete=async()=>{
        try {

            setLoading(true)
            await fetch(`/api/${params.storeId}/products/${product?._id}`,{method:"DELETE"})
            router.refresh();
            router.push(`/${params.storeId}/products`)
            toast.success("Product deleted");

        } catch (error) {
            // toast.error("Make sure you removed all categories using this billboard. ")

        }finally{
            setLoading(false)
            setOpen(false);
        }
    }



const formattedCategorys=categorys && categorys?.map((item)=>({
    id:item._id,
    name:item.name
}))



const initialPlaceholder=(n:string)=>{
    try{
    if(!product) return "";
    const prop:any=Product.Propertys.filter((item:any)=>(item.name==n))
    return prop[0].value;
    }
    catch(error){
        console.log("something went wrong")
    }
}

  return (<>
  <AlertModal
  isOpen={open}
  onClose={()=>setOpen(false)}
  onConfirm={()=>{onDelete()}}
  loading={loading}
  />
  <div className='flex items-center justify-between'>
        <Heading title={title} description={description}/>
     {product &&   <Button 
        size={'icon'}
        variant={'destructive'}
        className='ml-auto'
        disabled={loading}
        onClick={()=>{setOpen(true)}}
        >
            <Trash className='h-4 w-4' />
        </Button>}
        </div>
        <hr className='my-2' />
    
        <div>
            <p className='tracking-tighter font-medium'>Products Image</p>
            <div>
                <ImageUpload
                value={Images}
                disabled={loading}
                onChange={(url)=>{setImages(()=>([...Images,url]))
                console.log(url,Images);
                }}
                onRemove={(index:number)=>setImages(()=>{
                    const images=Images.filter((_,i)=>(index!=i))
                    return images;
                })}
                />
            </div>
            <div className='grid md:grid-cols-3 grid-cols-1 gap-x-4 gap-y-4'>
                
            
            <div>
                 <p className={"font-medium tracking-tighter mt-4"}>Name</p>
                <Input
                   placeholder='Product name '
                   value={name} onChange={(e)=>setName(e.target.value)}
                    disabled={loading}
                />
            </div>
            <div>
                 <p className={"font-medium tracking-tighter mt-4"}>Quantity</p>
                <Input
                   placeholder='Quantity '
                   type='number'
                   value={quantity} onChange={(e)=>setQuantity(Number.parseInt(e.target.value))}
                    disabled={loading}
                />
            </div>
            <div>
                 <p className={"font-medium tracking-tighter mt-4"}>Price</p>
                <Input
                   placeholder='9999 '
                   type='number'
                   value={price} onChange={(e)=>setPrice(Number.parseInt(e.target.value))}
                    disabled={loading}
                />
            </div>
            <div>
                 <p className={"font-medium tracking-tighter mt-4"}>Category</p>
                <MainSelect data={formattedCategorys} defaultValue={""} onChange={(e)=>{
                    setCategory(e);
                const cate:any=categorys?.filter(item=>item._id==e)
                setPropertys(cate[0].value)

                }} placeholderValue={product?.categoryId?.name || "Category"}  />
            </div>
            <div className='flex gap-x-3'>
                 <Checkbox  checked={isFeatured} onCheckedChange={(e:any)=>{
                    setIsFeatured(e)
                 }} />
                 <div>
                    <h4 className='font-medium text-lg'>Featured</h4>
                    <p>This product will appear in home page</p>
                 </div>
            </div>
            <div className='flex gap-x-3'>
                 <Checkbox  checked={isArchived} onCheckedChange={(e:any)=>{
                    setIsArchieved(e)
                 }} />
                 <div>
                    <h4 className='font-medium text-lg'>Archived</h4>
                    <p>This product will not appear in store</p>
                 </div>
            </div>
            {propertys && propertys.length>0 && propertys.map((item:any,i:number)=>{
                const formattedPropertys=item.value.map((p:any,i:any)=>({
                    name:p,
                    id:i
                }))
                return <div key={i}>
                <p className={"font-medium tracking-tighter mt-4 capitalize"}>{item.name}</p>
               <MainSelect data={formattedPropertys} defaultValue={""} onChange={(e)=>{setProduct(()=>{
                   const pro:any=Product
                   let proi=0;
                   const propertyPresent=pro.Propertys.filter((p:any,ip:number)=>{
                    if(!p) return false;
                    return p.name==item.name})
                    if(propertyPresent.length>0){
                        const newPropertys=pro.Propertys.map((obj:any)=>{
                            if(obj.name==item.name){
                                obj.value=item.value[e]
                            }
                            return obj;
                        })
                        pro.Propertys=newPropertys;
                    }else{
                        pro.Propertys.push({name:item.name,value:item.value[e]})
                    }
                   return pro
               })}} placeholderValue={`${product?initialPlaceholder(item.name):item.name}`}  />
           </div>
            })}
            </div>
        
       <Button disabled={loading} onClick={onSave} className='block mt-4'>
        {action}
       </Button>
        </div>
    <hr className='my-3'/>
       
    </>
  )
}

export default ProductForm