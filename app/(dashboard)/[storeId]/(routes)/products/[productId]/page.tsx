import connectToDB from "@/lib/connectToDB";
import ProductForm from "./components/product-form";
import Product from "@/Models/ProductSchema";
import Category from "@/Models/CategorySchema";



const findObject=async(id:string)=>{
try {

  const product=await Product.findById(id).populate("categoryId");
  if(product){
    return JSON.parse(JSON.stringify(product))
  }else{
    return null
  }

} catch (error) {
  return false
}
}



const findCategories=async(id:string)=>{
  try {
  
    const categorys=await Category.find({storeId:id});
    if(categorys){
      return JSON.parse(JSON.stringify(categorys))
    }else{
      return null
    }
  
  } catch (error) {
    return false
  }
  }


const ProductFormPage =async ({params}:{params:{productId:string,storeId:string}}) => {

await connectToDB();

const categorys=await findCategories(params.storeId);

const product=await findObject(params.productId);


  return (
    <div className="p-8">
      <div>
     <ProductForm  categorys={categorys} product={product}/>
      </div>
    </div>
  )
}

export default ProductFormPage