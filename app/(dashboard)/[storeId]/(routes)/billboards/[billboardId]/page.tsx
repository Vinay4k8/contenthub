import BillBoard from "@/Models/BillBoardSchema";
import Heading from "@/components/Heading";
import connectToDB from "@/lib/connectToDB";
import BillBoardForm from "./components/billboard-form";



const findObject=async(id:string)=>{
try {

  const Billboard=await BillBoard.findById(id);
  if(BillBoard){
    return JSON.parse(JSON.stringify(Billboard))
  }else{
    return null
  }

} catch (error) {
  return false
}
}


const BillBoardPage =async ({params}:{params:{billboardId:string}}) => {

await connectToDB();

const billboard=await findObject(params.billboardId);


  return (
    <div className="p-8">
      <div>
     <BillBoardForm billboard={billboard}/>
      </div>
    </div>
  )
}

export default BillBoardPage