import connectToDB from "@/lib/connectToDB";
import CategoryForm from "./components/category-form";
import Category from "@/Models/CategorySchema";
import BillBoard from "@/Models/BillBoardSchema";



const findCategory=async(id:string)=>{
try {

  const category=await Category.findById(id);
  if(category){
    return JSON.parse(JSON.stringify(category))
  }else{
    return null
  }
} catch (error) {
  return false
}
}

const findBillBoards=async(id:string)=>{
  try {
    const billboards=await BillBoard.find({storeId:id});
    if(billboards){
      return JSON.parse(JSON.stringify(billboards))
    }else{
      return null
    }
  } catch (error) {
    return false
  }
  }


  


const BillBoardPage =async ({params}:{params:{categoryId:string,storeId:string}}) => {

await connectToDB();

const category=await findCategory(params.categoryId);

const billboards=await findBillBoards(params.storeId);

  return (
    <div className="p-8">
      <div>
     <CategoryForm  billboards={billboards} category={category}/>
      </div>
    </div>
  )
}

export default BillBoardPage